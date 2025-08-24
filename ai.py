import chess
import math

board = chess.Board()


def translateBoard(board):
    board_str = str(board).replace("\n", "")
    board_str = str(board_str).replace(".", "0")
    board_str = str(board_str).replace(" ", "")
    return board_str


def RelativePieceValues(PieceType, index):
    match PieceType:
        case "R":
            WhiteRook = ("+10+10+10+10+10+10+10+10"
                         "+10+10+10+10+10+10+10+10"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+10+10+00+00+00"
                         "+00+00+00+10+10+05+00+00")
            displacement = int(WhiteRook[index * 3: index * 3 + 3]) / 100
            return (4.9 + displacement)
        case "N":
            WhiteKnight = ("-05-05-05-05-05-05-05-05"
                           "-05+00+00+10+10+00+00-05"
                           "-05+05+10+10+10+10+05-05"
                           "-05+05+10+15+15+10+05-05"
                           "-05+05+10+15+15+10+05-05"
                           "-05+05+10+10+10+10+05-05"
                           "-05+00+00+05+05+00+00-05"
                           "-05-10-05-05-05-05-10-05")
            displacement = int(WhiteKnight[index * 3: index * 3 + 3]) / 100
            return (2.9 + displacement)
        case "B":
            WhiteBishop = ("+00+00+00+00+00+00+00+00"
                           "+00+00+00+00+00+00+00+00"
                           "+00+00+00+00+00+00+00+00"
                           "+00+10+00+00+00+00+10+00"
                           "+05+00+10+00+00+10+00+05"
                           "+00+10+00+10+10+00+10+00"
                           "+00+10+00+10+10+00+10+00"
                           "+00+00-10+00+00-10+00+00")

            displacement = int(WhiteBishop[index * 3: index * 3 + 3]) / 100
            return (3.2 + displacement)
        case "Q":
            WhiteQueen = ("-20-10-10-05-05-10-10-20"
                          "-10+00+00+00+00+00+00-10"
                          "-10+00+05+05+05+05+00-10"
                          "-05+00+05+05+05+05+00-05"
                          "-05+00+05+05+05+05+00-05"
                          "-10+05+05+05+05+05+00-10"
                          "-10+00+05+00+00+00+00-10"
                          "-20-10-10+00+00-10-10-20")
            displacement = int(WhiteQueen[index * 3: index * 3 + 3]) / 100
            return (9 + displacement)
        case "K":
            WhiteKing = ("+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00-05-05-05+00+00"
                         "+00+00+10-05-05-05+10+00")
            displacement = int(WhiteKing[index * 3: index * 3 + 3]) / 100
            return (600 + displacement)
        case "P":
            WhitePawn = ("+00+00+00+00+00+00+00+00"
                         "+30+30+30+40+40+30+30+30"
                         "+20+20+20+30+30+30+20+20"
                         "+10+10+15+25+25+15+10+10"
                         "+05+05+05+20+20+05+05+05"
                         "+05+00+00+05+05+00+00+05"
                         "+05+05+05-10-10+05+05+05"
                         "+00+00+00+00+00+00+00+00")
            displacement = int(WhitePawn[index * 3: index * 3 + 3]) / 10
            return (1 + displacement)
        case "r":
            BlackRook = ("+00+00+00+00+00+00+00+00"
                         "+05+10+10+10+10+10+10+05"
                         "-05+00+00+00+00+00+00-05"
                         "-05+00+00+00+00+00+00-05"
                         "-05+00+00+00+00+00+00-05"
                         "-05+00+00+00+00+00+00-05"
                         "+10+10+10+10+10+10+10+10"
                         "+10+10+10+10+10+10+10+10")
            displacement = int(BlackRook[index * 3: index * 3 + 3]) / 100
            return -(4.9 + displacement)
        case "n":
            BlackKnight = ("-05-10-05-05-05-05-10-05"
                           "-05+00+00+05+05+00+00-05"
                           "-05+05+10+10+10+10+05-05"
                           "-05+05+10+15+15+10+05-05"
                           "-05+05+10+15+15+10+05-05"
                           "-05+05+10+10+10+10+05-05"
                           "-05+00+00+10+10+00+00-05"
                           "-05-05-05-05-05-05-05-05")
            displacement = int(BlackKnight[index * 3: index * 3 + 3]) / 100
            return -(2.9 + displacement)
        case "b":
            BlackBishop = ("+00+00-10+00+00-10+00+00"
                           "+00+10+00+10+10+00+10+00"
                           "+00+10+00+10+10+00+10+00"
                           "+05+00+10+00+00+10+00+05"
                           "+00+10+00+00+00+00+10+00"
                           "+00+00+00+00+00+00+00+00"
                           "+00+00+00+00+00+00+00+00"
                           "+00+00+00+00+00+00+00+00")
            displacement = int(BlackBishop[index * 3: index * 3 + 3]) / 100
            return -(3.2 + displacement)
        case "q":
            BlackQueen = ("-20-10-10+00+00-10-10-20"
                          "-10+00+05+00+00+00+00-10"
                          "-10+05+05+05+05+05+00-10"
                          "-05+00+05+05+05+05+00-05"
                          "-05+00+05+05+05+05+00-05"
                          "-10+00+05+05+05+05+00-10"
                          "-10+00+00+00+00+00+00-10"
                          "-20-10-10-05-05-10-10-20")
            displacement = int((BlackQueen[index * 3: index * 3 + 3])) / 100
            return -(9 + displacement)
        case "k":
            BlackKing = ("+00+00+10-05-05-05+10+00"
                         "+00+00+00-05-05-05+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00"
                         "+00+00+00+00+00+00+00+00")
            displacement = int(BlackKing[index * 3: index * 3 + 3]) / 100
            return -(600 + displacement)
        case "p":
            BlackPawn = ("+00+00+00+00+00+00+00+00"
                         "+05+05+05-10-10+05+05+05"
                         "+05+00+00+05+05+00+00+05"
                         "+05+05+05+20+20+05+05+05"
                         "+10+10+15+25+25+15+10+10"
                         "+20+20+20+30+30+30+20+20"
                         "+30+30+30+40+40+30+30+30"
                         "+00+00+00+00+00+00+00+00")
            displacement = int(BlackPawn[index * 3: index * 3 + 3]) / 100
            return -(1 + displacement)
    return 0


def valueBoard(board,Chessboard):
    totalValue = 0
    for i in range(len(board)):
        # print(RelativePieceValues(board[i], i))
        totalValue += RelativePieceValues(board[i], i)
    return totalValue





def minimax(positionBoard, depth, alpha, beta, color):
    if depth == 0 or positionBoard.is_game_over():
        return None, valueBoard(translateBoard(positionBoard),positionBoard)

    bestMove = None

    if color:
        maxEval = -math.inf
        moves = list(positionBoard.legal_moves)
        #print(moves)
        #print(chess.Move.from_uci(str(board_instance.legal_moves)))
        for move in moves:
            positionBoard.push(move)
            _, eval = minimax(positionBoard, depth - 1, alpha, beta, False)
            positionBoard.pop()
            if eval > maxEval:
                maxEval = eval
                bestMove = move
            alpha = max(alpha, eval)
            if beta <= alpha:
                break
        return bestMove, maxEval

    else:
        minEval = math.inf
        moves = list(positionBoard.legal_moves)
        for move in moves:
            positionBoard.push(move)
            _, eval = minimax(positionBoard, depth - 1, alpha, beta, True)
            positionBoard.pop()
            if eval < minEval:
                minEval = eval
                bestMove = move
            beta = (min(beta, eval))
            if beta <= alpha:
                break
        return bestMove, minEval


# print(valueBoard(translateBoard(board)))
index_to_square = {
    0: "a8", 1: "b8", 2: "c8", 3: "d8", 4: "e8", 5: "f8", 6: "g8", 7: "h8",
    8: "a7", 9: "b7", 10: "c7", 11: "d7", 12: "e7", 13: "f7", 14: "g7", 15: "h7",
    16: "a6", 17: "b6", 18: "c6", 19: "d6", 20: "e6", 21: "f6", 22: "g6", 23: "h6",
    24: "a5", 25: "b5", 26: "c5", 27: "d5", 28: "e5", 29: "f5", 30: "g5", 31: "h5",
    32: "a4", 33: "b4", 34: "c4", 35: "d4", 36: "e4", 37: "f4", 38: "g4", 39: "h4",
    40: "a3", 41: "b3", 42: "c3", 43: "d3", 44: "e3", 45: "f3", 46: "g3", 47: "h3",
    48: "a2", 49: "b2", 50: "c2", 51: "d2", 52: "e2", 53: "f2", 54: "g2", 55: "h2",
    56: "a1", 57: "b1", 58: "c1", 59: "d1", 60: "e1", 61: "f1", 62: "g1", 63: "h1"
}
square_to_index = {v: k for k, v in index_to_square.items()}




def translateMovelog(moveLog):
    board = chess.Board()
    for move in moveLog:
        moves = str(index_to_square[int(move[0:2])]) + str(index_to_square[int(move[3:])])
        board.push_uci(moves)
        # board.push_uci("f2f4")
    return board


# print(custom_string_to_fen("rnbqkb0rppppn00p000000p00000000Q000000000000P000PPP00PPPRNB0KBNR"))
print(minimax(translateMovelog(['53P37', '12p28', '37P28', '13p21', '52P44', '14p22', '59Q31','09p25','31Q15']), 4, -math.inf, math.inf, False))
print(translateMovelog(['53P37', '12p28', '37P28', '13p21', '52P44', '14p22', '59Q31','09p25','31Q15']))
#'31Q15'

# print(translateMovelog(['53P37', '12p28', '37P28', '13p21', '52P44', '14p22', '59Q31']))

def translateMove(board, move):
    return str(square_to_index[move[0:2]]) + board[square_to_index[move[0:2]]] + str(square_to_index[move[2:]])


#print(translateMove(translateBoard(board), "g1h3"))
