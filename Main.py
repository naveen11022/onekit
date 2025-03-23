from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormData(BaseModel):
    name: str
    email: EmailStr
    phone: str
    portfolio: str
    privacy_policy: bool
    future_opportunities: bool

def send_email(data: FormData):
    try:
        sender_email = data.email
        password = "crzl sicn ekoz iqqm"
        receiver_email = "23am040@kpriet.ac.in"

        subject = "New Form Submission"
        body = f"""
        Name: {data.name}
        Email: {data.email}
        Phone: {data.phone}
        Portfolio: {data.portfolio}
        Privacy Policy Accepted: {data.privacy_policy}
        Future Opportunities Consent: {data.future_opportunities}
        """

        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")

@app.post("/submit")
async def submit_form(data: FormData):
    try:
        print(f"Received form data: {data}")

        send_email(data)

        return {"message": "Form submitted successfully and email sent!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {str(e)}")
