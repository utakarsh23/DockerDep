from flask import Flask

app = Flask(__name__)

@app.route("/hello", methods=["GET"])
def hello():
    print("huhhh this got called")
    return "this was running in python"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7777)
