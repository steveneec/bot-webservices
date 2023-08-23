import warnings
import os
import pathlib
import pickle
import sys

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1' 
warnings.filterwarnings("ignore")

sentence = sys.argv[1]

MAX_SEQ_LEN = 35

with open(pathlib.Path(__file__).parent.parent.__str__() + '/models/lstm_intents/lstm_tokenizer.pickle', 'rb') as f:
    tokenizer = pickle.load(f)

with open(pathlib.Path(__file__).parent.parent.__str__() + '/models/lstm_intents/lstm_encoder.pickle', 'rb') as f:
    encoder = pickle.load(f)

with open(pathlib.Path(__file__).parent.parent.__str__() + '/models/lstm_intents/lstm_model.pickle', 'rb') as f:
    model = pickle.load(f)

with open(pathlib.Path(__file__).parent.parent.__str__() + '/models/lstm_intents/lstm_pad_sequences.pickle', 'rb') as f:
    pad_sequences = pickle.load(f)

input_seq = tokenizer.texts_to_sequences([sentence])
input_features = pad_sequences(input_seq, maxlen = MAX_SEQ_LEN, padding = 'post')
probs = model.predict(input_features, verbose=0)
predicted_y = probs.argmax(axis=-1)

print(encoder.classes_[predicted_y][0])