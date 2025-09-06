import math
from flask import Flask, request, jsonify
from flask_cors import CORS
import ai
import os

app = Flask(__name__)
CORS(app)

@app.route("/move", methods=["POST"])
def get_ai_move():
    data = request.json
    move_log = data["move_log"]
    board_input = data["board_input"]  
    turn = len(move_log) % 2 == 0
    try: 
        move = ai.translateMove(board_input,ai.minimax(ai.translateMovelog(move_log), 4, -math.inf, math.inf, turn)[0].uci())

    except TypeError as e:
        return

    return jsonify({"move": move})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)