# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from flask import Flask
from twilio.twiml.messaging_response import MessagingResponse

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = 'AC03a91712a79760419dbe44aee0022f7c' #os.environ['ACe56afbae8885fcd98a51205dc5bf46eb']
auth_token = '731b3e743dab4788a1023ac4af44432b' #os.environ['9c5b0f5e82c8fdd8e072bf9383f1ba5a']
client = Client(account_sid, auth_token)

app = Flask(__name__)
@app.route("/", methods=["GET", "POST"])
def hello():
    print("hello")
# def receive_message():
#     print("in receive message")
#     try:
#         resp = MessagingResponse()
#         resp.message("Registering response:")
#         # print(resp)
#         return str(resp)

#     except Exception as e:
#         print(e);

def send_text():
    message = client.messages.create(
                                from_='+18449434713',
                                body='Ahoy world, from Python', 
                                to='+18582127078' #swap for students numbers later
                            )

    print(f"SID: {message.sid} Status: {message.status}")


def main():
    print("starting")
    send_text()
    print("sent text")
    app.run(debug=True)
    print("complete")


if __name__ == "__main__":
    main()

