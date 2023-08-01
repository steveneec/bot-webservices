#!pip install transformers==4.28.1 soundfile sentencepiece torchaudio pydub
from transformers import *
import torch
import soundfile as sf
import os
import torchaudio
import sys

device = "cuda:0" if torch.cuda.is_available() else "cpu"

audio_url = sys.argv[1]

whisper_model_name = "openai/whisper-medium" # multilingual, ~ 967 MB

whisper_processor = WhisperProcessor.from_pretrained(whisper_model_name)
whisper_model = WhisperForConditionalGeneration.from_pretrained(whisper_model_name).to(device)

wav2vec2_processor = Wav2Vec2Processor.from_pretrained(whisper_model_name)
wav2vec2_model = Wav2Vec2ForCTC.from_pretrained(whisper_model_name).to(device)

# load our wav file
speech, sr = torchaudio.load(audio_url)
speech = speech.squeeze()

# resample from whatever the audio sampling rate to 16000
resampler = torchaudio.transforms.Resample(sr, 16000)
speech = resampler(speech)

# tokenize our wav
input_values = wav2vec2_processor(speech, return_tensors="pt", sampling_rate=16000)["input_values"].to(device)

# perform inference
logits = wav2vec2_model(input_values)["logits"]

def load_audio(audio_path):
  """Load the audio file & convert to 16,000 sampling rate"""
  # load our wav file
  speech, sr = torchaudio.load(audio_path)
  resampler = torchaudio.transforms.Resample(sr, 16000)
  speech = resampler(speech)
  return speech.squeeze()

def get_transcription_wav2vec2(audio_path, model, processor):
  speech = load_audio(audio_path)
  input_features = processor(speech, return_tensors="pt", sampling_rate=16000)["input_values"].to(device)
  # perform inference
  logits = model(input_features)["logits"]
  # use argmax to get the predicted IDs
  predicted_ids = torch.argmax(logits, dim=-1)
  transcription = processor.batch_decode(predicted_ids)[0]
  return transcription.lower()

# get the input features
input_features = whisper_processor(load_audio(audio_url), sampling_rate=16000, return_tensors="pt").input_features.to(device)

# get special decoder tokens for the language
forced_decoder_ids = whisper_processor.get_decoder_prompt_ids(language="spanish", task="transcribe")

# perform inference
predicted_ids = whisper_model.generate(input_features, forced_decoder_ids=forced_decoder_ids)

#decode the IDs to text
transcription = whisper_processor.batch_decode(predicted_ids, skip_special_tokens=True)
print(transcription[0])