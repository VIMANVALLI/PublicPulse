from fastapi import FastAPI, Depends, UploadFile, File, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models, schemas, auth
from passlib.context import CryptContext
import os
import pandas as pd
import json
from datetime import datetime
import requests
from dotenv import load_dotenv
from sentiment import get_sentiment
from analyzer import analyze
from schemas import YoutubeURL

# =====================================================
# ================== APP INIT =========================
# =====================================================

app = FastAPI()

comments_db = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://publicpulse-569.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# =====================================================
# ================== PASSWORD =========================
# =====================================================

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

# =====================================================
# ================== DB SESSION =======================
# =====================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =====================================================
# ================== FILE INIT ========================
# =====================================================

UPLOAD_FOLDER = "uploads"
OP_FILE = "opinions.json"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

if not os.path.exists(OP_FILE):
    with open(OP_FILE, "w") as f:
        json.dump([], f)

# =====================================================
# ================== YOUTUBE SECTION ==================
# =====================================================

load_dotenv()
API_KEY = os.getenv("YOUTUBE_API_KEY")

if not API_KEY:
    print("⚠️ WARNING: YOUTUBE_API_KEY not found in .env")


# ---------- Extract Video ID ----------
def extract_video_id(url: str):
    if not url:
        return None

    if "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]

    if "v=" in url:
        return url.split("v=")[1].split("&")[0]

    return None

# ---------- Fetch Video Title ----------
def fetch_video_title(video_id):

    url = "https://www.googleapis.com/youtube/v3/videos"

    params = {
        "part": "snippet",
        "id": video_id,
        "key": API_KEY
    }

    res = requests.get(url, params=params)

    if res.status_code != 200:
        return ""

    data = res.json()

    if not data.get("items"):
        return ""

    return data["items"][0]["snippet"]["title"]

# ---------- Fetch Comments ----------
def fetch_comments(video_id):

    youtube_url = "https://www.googleapis.com/youtube/v3/commentThreads"

    params = {
        "part": "snippet",
        "videoId": video_id,
        "key": API_KEY,
        "maxResults": 50
    }

    response = requests.get(youtube_url, params=params)

    if response.status_code != 200:
        raise HTTPException(
            status_code=400,
            detail="YouTube API error"
        )

    data = response.json()

    if "items" not in data:
        raise HTTPException(
            status_code=400,
            detail="Invalid YouTube response"
        )

    comments = []

    for item in data["items"]:
        snippet = item["snippet"]["topLevelComment"]["snippet"]

        text = snippet.get("textDisplay", "")
        likes = snippet.get("likeCount", 0)

        comments.append({
            "text": text,
            "likes": likes,
            "sentiment": get_sentiment(text)
        })

    return comments


# ---------- Fetch from Frontend ----------
@app.post("/youtube/fetch")
def youtube_fetch(data: YoutubeURL, db: Session = Depends(get_db)):

    url = data.url

    if not url:
        raise HTTPException(status_code=400, detail="URL is required")

    # extract video id
    video_id = extract_video_id(url)

    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")

    # fetch title
    title = fetch_video_title(video_id)

    # fetch comments + sentiment
    comments = fetch_comments(video_id)

    # clear old comments
    db.query(models.Comment).delete()

    # store new comments
    for c in comments:
        db.add(models.Comment(
            text=c["text"],
            likes=c["likes"],
            sentiment=c["sentiment"]
        ))

    db.commit()

    # save title temp
    with open("video_title.txt", "w", encoding="utf-8") as f:
        f.write(title)

    return {
        "message": "Comments stored successfully",
        "count": len(comments),
        "title": title
    }

# ---------- All Comments ----------
@app.get("/youtube/comments")
def get_comments(db: Session = Depends(get_db)):
    rows = db.query(models.Comment).all()

    title = ""
    if os.path.exists("video_title.txt"):
        with open("video_title.txt", "r", encoding="utf-8") as f:
            title = f.read()

    return {
        "title": title,
        "comments": [
            {
                "id": r.id,
                "text": r.text,
                "likes": r.likes,
                "sentiment": r.sentiment
            }
            for r in rows
        ]
    }

# ---------- Positive ----------
@app.get("/youtube/positive")
def youtube_positive(db: Session = Depends(get_db)):
    rows = db.query(models.Comment)\
             .filter(models.Comment.sentiment == "positive")\
             .all()

    return [
        {"text": r.text, "likes": r.likes, "sentiment": r.sentiment}
        for r in rows
    ]


# ---------- Negative ----------
@app.get("/youtube/negative")
def youtube_negative(db: Session = Depends(get_db)):
    rows = db.query(models.Comment)\
             .filter(models.Comment.sentiment == "negative")\
             .all()

    return [
        {"text": r.text, "likes": r.likes, "sentiment": r.sentiment}
        for r in rows
    ]


# ---------- Summary ----------
@app.get("/youtube/summary")
def youtube_summary(db: Session = Depends(get_db)):

    total = db.query(models.Comment).count()
    positive = db.query(models.Comment)\
                 .filter(models.Comment.sentiment == "positive")\
                 .count()
    negative = db.query(models.Comment)\
                 .filter(models.Comment.sentiment == "negative")\
                 .count()

    neutral = total - (positive + negative)

    return {
        "total": total,
        "positive": positive,
        "negative": negative,
        "neutral": neutral
    }
@app.get("/fetch-all")
def fetch_all():
    return comments_db

# ---------- Admin Result ----------
@app.get("/admin/result")
def admin_result(db: Session = Depends(get_db)):
    rows = db.query(models.Comment).all()

    data = [
        {"text": r.text, "likes": r.likes, "sentiment": r.sentiment}
        for r in rows
    ]

    return analyze(data)


# =====================================================
# ================== AUTH SECTION =====================
# =====================================================

@app.post("/login")
def login(data: schemas.Login, db: Session = Depends(get_db)):

    if data.role == "admin":
        if data.username == "admin" and data.password == "admin123":
            token = auth.create_token({"user": "admin"})
            return {"token": token}
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    user = db.query(models.User).filter_by(username=data.username).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    if not pwd.verify(data.password[:72], user.password):
        raise HTTPException(status_code=401, detail="Wrong password")

    token = auth.create_token({"user": user.username})
    return {"token": token}


@app.post("/signup")
def signup(data: schemas.Signup, db: Session = Depends(get_db)):

    hashed = pwd.hash(data.password[:72])

    user = models.User(
        username=data.username,
        email=data.email,
        password=hashed,
        role="user"
    )
    db.add(user)
    db.commit()

    return {"msg": "Account created"}


# =====================================================
# ================== DATASET SECTION ==================
# =====================================================

@app.post("/admin/upload-dataset")
async def upload_dataset(file: UploadFile = File(...), db: Session = Depends(get_db)):

    allowed = ["xlsx", "xls", "csv"]
    ext = file.filename.split(".")[-1].lower()

    if ext not in allowed:
        return {"error": "Only Excel/CSV allowed"}

    path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(path, "wb") as buffer:
        buffer.write(await file.read())

    ds = models.Dataset(filename=file.filename)
    db.add(ds)
    db.commit()

    return {"msg": "File uploaded"}


@app.get("/admin/datasets")
def all_datasets():
    all_rows = []

    for file in os.listdir(UPLOAD_FOLDER):
        path = os.path.join(UPLOAD_FOLDER, file)

        try:
            if file.endswith(".csv"):
                df = pd.read_csv(path)
            elif file.endswith(".xlsx"):
                df = pd.read_excel(path)
            elif file.endswith(".xls"):
                df = pd.read_excel(path, engine="xlrd")
            else:
                continue

            rows = df.fillna("").to_dict(orient="records")
            all_rows.extend(rows)

        except Exception as e:
            print("Error reading:", e)

    return all_rows


# =====================================================
# ================== OPINION SECTION ==================
# =====================================================

@app.post("/user/opinion")
def add_opinion(op: dict, authorization: str = Header(None)):

    username = "user"

    if authorization:
        try:
            token = authorization.split(" ")[1]
            payload = auth.verify_token(token)
            if payload:
                username = payload.get("username") or payload.get("user") or "user"
        except:
            pass

    if not op.get("record_id") or not op.get("policy_id"):
        return {"msg": "Invalid feedback data"}

    with open(OP_FILE, "r") as f:
        data = json.load(f)

    comment = op.get("comment", "")
    recommendation = ""

    if op.get("type") == "negative":
        text = comment.lower()

        if "should" in text:
            recommendation = comment.split("should")[-1].strip().capitalize()
        elif "provide" in text:
            recommendation = "Provide " + comment.split("provide")[-1].strip()
        elif "need" in text:
            recommendation = "Need " + comment.split("need")[-1].strip()
        else:
            recommendation = comment

    new_op = {
        "record_id": op.get("record_id"),
        "policy_id": op.get("policy_id"),
        "description": op.get("description"),
        "date_announced": op.get("date_announced"),
        "comment": comment,
        "recommendation": recommendation,
        "username": username,
        "datetime": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        "type": op.get("type"),
    }

    data.append(new_op)

    with open(OP_FILE, "w") as f:
        json.dump(data, f, indent=4)

    return {"msg": "Opinion saved", "recommendation": recommendation}


@app.get("/admin/opinions")
def all_opinions():
    with open(OP_FILE, "r") as f:
        return json.load(f)


@app.get("/admin/positive")
def positive():
    with open(OP_FILE, "r") as f:
        data = json.load(f)
    return [d for d in data if d.get("type") == "positive"]


@app.get("/admin/negative")
def negative():
    with open(OP_FILE, "r") as f:
        data = json.load(f)
    return [d for d in data if d.get("type") == "negative"]


@app.get("/admin/recommendations")
def get_recommendations():
    with open(OP_FILE, "r") as f:
        data = json.load(f)
    return [d for d in data if d.get("recommendation")]

@app.get("/user/schemes")
def get_all_schemes():
    import json, os

    if not os.path.exists("datasets.json"):
        return []

    with open("datasets.json", "r") as f:
        return json.load(f)


@app.get("/user/details")
def user_view_datasets():
    all_rows = []

    if not os.path.exists(UPLOAD_FOLDER):
        return []

    for file in os.listdir(UPLOAD_FOLDER):
        path = os.path.join(UPLOAD_FOLDER, file)

        try:
            if file.endswith(".csv"):
                df = pd.read_csv(path)

            elif file.endswith(".xlsx"):
                df = pd.read_excel(path)

            elif file.endswith(".xls"):
                df = pd.read_excel(path, engine="xlrd")

            else:
                continue

            rows = df.fillna("").to_dict(orient="records")
            all_rows.extend(rows)

        except Exception as e:
            print("Error reading:", file, e)

    return all_rows


@app.get("/user/myfeedback")
def my_feedback(authorization: str = Header(None)):
    import json

    username = "user"

    if authorization:
        try:
            token = authorization.split(" ")[1]
            payload = auth.verify_token(token)
            if payload:
                username = payload.get("username", "user")
        except:
            pass

    with open(OP_FILE, "r") as f:
        data = json.load(f)

    user_data = [x for x in data if x.get("username") == username]

    print("Current user:", username)
    print("Filtered data:", user_data)

    return user_data

@app.get("/user/feedback")
def user_feedback():
    with open(OP_FILE, "r") as f:
        data = json.load(f)

    # return only current user's feedback (optional)
    return data

@app.get("/user/recommendations")
def user_rec():
    return [
        {"recommendation": "Good dataset", "score": 85},
        {"recommendation": "Add more data", "score": 75},
    ]
