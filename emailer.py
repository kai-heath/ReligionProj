import os
from email.message import EmailMessage
import ssl
import smtplib

email_sender = 'wordsofchristproject@gmail.com'
email_password = 'iqgj xdxk iyzc gpeh '
email_recipient = ['kheath0@byu.edu', 'kaiheath1277@gmail.com']

subject = 'Test Email'
body = 'I figured out automated email sending!'
em = EmailMessage()
em['From'] = email_sender
em['To'] = email_recipient
em['Subject'] = subject
em.set_content(body)

context = ssl.create_default_context()

with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
    smtp.login(email_sender, email_password)
    smtp.send_message(em)
    print('Email sent successfully')
    smtp.quit()
