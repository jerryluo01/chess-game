import chess
import math

board = chess.Board()


def translateBoard(board):
    board_str = str(board).replace("\n", "")
    board_str = str(board_str).replace(".", "0")
    board_str = str(board_str).replace(" ", "")
    return board_str


def RelativePieceValues(PieceType, index,endgame):
    match PieceType:
        case "R":
            WhiteRook = ("+00+00+00+00+00+00+00+00"
                             "+05+10+10+10+10+10+10+05"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "+00+00+00+00+00+00+00+00")
            displacement = int(WhiteRook[index * 3: index * 3 + 3])
            return (500 + displacement)
        case "N":
            WhiteKnight = ("-50-40-30-30-30-30-40-50"
                               "-40-20+00+00+00+00-20-40"
                               "-30+00+10+15+15+10+00-30"
                               "-30+05+15+20+20+15+05-30"
                               "-30+00+15+20+20+15+00-30"
                               "-30+05+10+15+15+10+05-30"
                               "-40-20+00+05+05+00-20-40"
                               "-50-40-30-30-30-30-40-50")
            displacement = int(WhiteKnight[index * 3: index * 3 + 3])
            return (320 + displacement)
        case "B":
            WhiteBishop = ("-20-10-10-10-10-10-10-20"
                               "-10+00+00+00+00+00+00-10"
                               "-10+00+05+10+10+05+00-10"
                               "-10+05+05+10+10+05+05-10"
                               "-10+00+10+10+10+10+00-10"
                               "-10+10+10+10+10+10+10-10"
                               "-10+05+00+00+00+00+05-10"
                               "-20-10-10-10-10-10-10-20")

            displacement = int(WhiteBishop[index * 3: index * 3 + 3]) 
            return (330 + displacement)
        case "Q":
            WhiteQueen = ("-20-10-10-05-05-10-10-20"
                              "-10+00+00+00+00+00+00-10"
                              "-10+00+05+05+05+05+00-10"
                              "-05+00+05+05+05+05+00-05"
                              "+00+00+05+05+05+05+00-05"
                              "-10+05+05+05+05+05+00-10"
                              "-10+00+05+00+00+00+00-10"
                              "-20-10-10-05-05-10-10-20")
            displacement = int(WhiteQueen[index * 3: index * 3 + 3]) 
            return (900 + displacement)
        case "K":
            if (not endgame):
                WhiteKing = ("-30-40-40-50-50-40-40-30"
                                "-30-40-40-50-50-40-40-30"
                                "-30-40-40-50-50-40-40-30"
                                "-30-40-40-50-50-40-40-30"
                                "-20-30-30-40-40-30-30-20"
                                "-10-20-20-20-20-20-20-10"
                                "+20+20+00+00+00+00+20+20"
                                "+20+30+10+00+00+10+30+20")
            else:
                WhiteKing = (
                    "-50-40-30-20-20-30-40-50"
                    "-30-20-10+00+00-10-20-30"
                    "-30-10+20+30+30+20-10-30"
                    "-30-10+30+40+40+30-10-30"
                    "-30-10+30+40+40+30-10-30"
                    "-30-10+20+30+30+20-10-30"
                    "-30-30+00+00+00+00-30-30"
                    "-50-30-30-30-30-30-30-50"
                )
            displacement = int(WhiteKing[index * 3: index * 3 + 3])
            return (20000 + displacement)
        case "P":
            WhitePawn = ("+00+00+00+00+00+00+00+00"
                             "+50+50+50+50+50+50+50+50"
                             "+10+10+20+30+30+20+10+10"
                             "+05+05+10+25+25+10+05+05"
                             "+00+00+00+20+20+00+00+00"
                             "+05-05-10+00+00-10-05+05"
                             "+05+10+10-20-20+10+10+05"
                             "+00+00+00+00+00+00+00+00")
            displacement = int(WhitePawn[index * 3: index * 3 + 3])

            return (100 + displacement)
        case "r":
            BlackRook = ("+00+00+00+05+05+00+00+00"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "-05+00+00+00+00+00+00-05"
                             "+05+10+10+10+10+10+10+05"
                             "+00+00+00+00+00+00+00+00")
            displacement = int(BlackRook[index * 3: index * 3 + 3]) 
            return -(500 + displacement)
        case "n":
            BlackKnight = ("-50-40-30-30-30-30-40-50"
                               "-40-20+00+05+05+00-20-40"
                               "-30-05+10+15+15+10+05-30"
                               "-30+00+15+20+20+15-00-30"
                               "-30+05+15+20+20+15+05-30"
                               "-30+00+10+15+15+10+00-30"
                               "-40-20+00+00+00+00-20-40"
                               "-50-40-30-30-30-30-40-50")
            displacement = int(BlackKnight[index * 3: index * 3 + 3]) 
            return -(320 + displacement)
        case "b":
            BlackBishop = ("-20-10-10-10-10-10-10-20"
                               "-10+05+00+00+00+00+05-10"
                               "-10+10+10+10+10+10+10-10"
                               "-10+00+10+10+10+10+00-10"
                               "-10+05+05+10+10+05+05-10"
                               "-10+05+05+10+10+05+05-10"
                               "-10+00+00+00+00+00+00-10"
                               "-20-10-10-10-10-10-10-20")
            displacement = int(BlackBishop[index * 3: index * 3 + 3]) 
            return -(330 + displacement)
        case "q":
            BlackQueen = ("-20-10-10-05-05-10-10-20"
                              "-10+00+05+00+00+00+00-10"
                              "-10+05+05+05+05+05+00-10"
                              "+00+00+05+05+05+05+00-05"
                              "-05+00+05+05+05+05+00-05"
                              "-10+00+05+05+05+05+00-10"
                              "-10+00+00+00+00+00+00-10"
                              "-20-10-10-05-05-10-10-20")
            displacement = int((BlackQueen[index * 3: index * 3 + 3])) 
            return -(900 + displacement)
        case "k":
            if (not endgame):
                BlackKing = ("+20+30+10+00+00+10+30+20"
                              "+20+20+00+00+00+00+20+20"
                              "-10-20-20-20-20-20-20-10"
                              "-20-30-30-40-40-30-30-20"
                              "-30-40-40-50-50-40-40-30"
                              "-30-40-40-50-50-40-40-30"
                              "-30-40-40-50-50-40-40-30"
                              "-30-40-40-50-50-40-40-30")
            else:
                BlackKing = ("+50+30+30+30+30+30+30+50"
                    "+30+30+00+00+00+00+30+30"
                    "+30+10-20-30-30-20+10+30"
                    "+30+10-30-40-40-30+10+30"
                    "+30+10-30-40-40-30+10+30"
                    "+30+10-20-30-30-20+10+30"
                    "+30+20+10+00+00+10+20+30"
                    "+50+40+30+20+20+30+40+50")

            displacement = int(BlackKing[index * 3: index * 3 + 3])
            return -(20000 + displacement)
        case "p":
            BlackPawn = ("+00+00+00+00+00+00+00+00"
                             "+50+50+50+50+50+50+50+50"
                             "+10+10+20+30+30+20+10+10"
                             "+05+05+10+25+25+10+05+05"
                             "+00+00+00+20+20+00+00+00"
                             "+05-05-10+00+00-10-05+05"
                             "+05+10+10-20-20+10+10+05"
                             "+00+00+00+00+00+00+00+00")
            displacement = int(BlackPawn[index * 3: index * 3 + 3]) 
            return -(100 + displacement)
    return 0

def boolEndgame(board_str):
    if (board_str.count("Q") == 0 and board_str.count("q") == 0):
        return True
    if board_str.count("Q") > 0:
        if board_str.count("N") + board_str.count("B") + board_str.count("R") > 1:
            return False
    if board_str.count("q") > 0:
        if board_str.count("n") + board_str.count("b") + board_str.count("r") > 1:
            return False
    return True


def valueBoard(board):
    totalValue = 0
    endgame = boolEndgame(board)

    for i in range(len(board)):
        totalValue += RelativePieceValues(board[i], i,endgame)
    return totalValue

def moveScore(board, move):
    piece = board.piece_at(move.to_square)
    score = 0

    if piece:
        value = {chess.PAWN:1, chess.KNIGHT:3, chess.BISHOP:3,
                 chess.ROOK:5, chess.QUEEN:9, chess.KING:1000}
        score += value[piece.piece_type]  

    if move.promotion:
        score += 10 

    return score



def minimax(positionBoard, depth, alpha, beta, color):
    if depth == 0 or positionBoard.is_game_over():
        if positionBoard.is_checkmate():
            return None, -math.inf if color else math.inf
        elif positionBoard.is_stalemate() or positionBoard.is_insufficient_material():
            return None, 0
        else: 
            return None, valueBoard(translateBoard(positionBoard))

    bestMove = None
    moves = list(positionBoard.legal_moves)

    if color:
        #moves.sort(key=lambda m: moveScore(positionBoard, m), reverse=True)
        maxEval = -math.inf
        for move in moves:
            piece = board.piece_at(move.from_square)
            if piece and piece.piece_type == chess.PAWN:
                if chess.square_rank(move.from_square) == 6 and chess.square_rank(move.to_square) == 7:
                    move = chess.Move(move.from_square, move.to_square, promotion=chess.QUEEN)
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
        #moves.sort(key=lambda m: moveScore(positionBoard, m))
        minEval = math.inf
        for move in moves:
            piece = board.piece_at(move.from_square)
            if piece and piece.piece_type == chess.PAWN:
                if chess.square_rank(move.from_square) == 6 and chess.square_rank(move.to_square) == 7:
                    move = chess.Move(move.from_square, move.to_square, promotion=chess.QUEEN)
            
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
        moves = str(index_to_square[int(move[0:2])]) + str(index_to_square[int(move[3:5])])+(str(move[5]) if len(move) > 5 else "")
        board.push_uci(moves)

    return board


def translateMove(board, move):
    return str(square_to_index[move[0:2]]) + board[square_to_index[move[0:2]]] + str(square_to_index[move[2:4]])


#print(translateMove(translateBoard(board), "g1h3"))
