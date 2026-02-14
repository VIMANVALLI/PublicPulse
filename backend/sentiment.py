from textblob import TextBlob
import re

def clean_text(text: str):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)   # remove links
    text = re.sub(r"[^\w\s]", " ", text)  # remove symbols
    return text


def get_sentiment(text: str):

    if not text:
        return "neutral"

    t = clean_text(text)

    # =========================================================
    # 🚨 VERY STRONG NEGATIVE (priority)
    # =========================================================
    strong_negative = [
        "worst", "waste", "useless", "scam", "fake",
        "public money waste", "waste scheme",
        "stop this", "cancel", "remove scheme",
        "chetta", "daridram", "bad decision",
        "tax money waste", "fraud",
        "free bus vaddu", "ticket teesukovali",
        "no use", "enduku", "apeyandi"
    ]

    for w in strong_negative:
        if w in t:
            return "negative"

    # =========================================================
    # 😡 MEDIUM NEGATIVE
    # =========================================================
    negative_words = [
        "not good", "bad", "problem", "issue",
        "disappointed", "waste of money",
        "wrong", "fail", "inefficient",
        "slow", "corruption", "burden", "?","??"     
    ]

    for w in negative_words:
        if w in t:
            return "negative"

    # =========================================================
    # 😍 STRONG POSITIVE
    # =========================================================
    strong_positive = [
        "very good", "great", "excellent",
        "super", "awesome", "best decision",
        "good scheme", "helpful", "useful",
        "help to poor", "support", "happy",
        "thanks", "well done",
        "great job", "nice initiative"
    ]

    for w in strong_positive:
        if w in t:
            return "positive"

    # =========================================================
    # 🙂 MEDIUM POSITIVE
    # =========================================================
    positive_words = [
        "good", "nice", "benefit", "improve",
        "helping", "useful", "ok good",
        "satisfied", "fine"
    ]

    for w in positive_words:
        if w in t:
            return "positive"

    # =========================================================
    # 😐 NEUTRAL WORDS
    # =========================================================
    neutral_words = [
        "ok", "average", "normal",
        "maybe", "depends", "not sure",
        "let us see", "we will see"
    ]

    for w in neutral_words:
        if w in t:
            return "neutral"

    # =========================================================
    # 😂 EMOJI DETECTION
    # =========================================================
    if any(e in text for e in ["😂","🤣","😡","🤦","😤"]):
        return "negative"

    if any(e in text for e in ["😍","👍","👏","🔥","❤️"]):
        return "positive"

    # =========================================================
    # 🧠 TEXTBLOB SMART FALLBACK
    # =========================================================
    score = TextBlob(text).sentiment.polarity

    if score > 0.25:
        return "positive"
    elif score < -0.25:
        return "negative"
    else:
        return "neutral"