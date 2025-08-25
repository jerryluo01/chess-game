import math
from flask import Flask, request, jsonify
from flask_cors import CORS
import chess
import ai

app = Flask(__name__)
CORS(app)

@app.route("/move", methods=["POST"])
def get_ai_move():
    data = request.json
    move_log = data["move_log"]
    board_input = data["board_input"]  
    turn = len(move_log) % 2 == 0
    move = ai.translateMove(board_input,ai.minimax(ai.translateMovelog(move_log), 3, -math.inf, math.inf, turn)[0].uci())

    return jsonify({"move": move})

if __name__ == "__main__":
    app.run(debug=True, port=5000)