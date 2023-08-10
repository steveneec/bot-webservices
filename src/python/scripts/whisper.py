#!pip install transformers==4.28.1 soundfile sentencepiece torchaudio pydub
from transformers import *
import torch
import torchaudio
import sys

#device = "cuda:0" if torch.cuda.is_available() else "cpu"
device = "gpu"
audio_url = sys.argv[1]
whisper_model_name = "openai/whisper-large"
whisper_processor = WhisperProcessor.from_pretrained(whisper_model_name)
whisper_model = WhisperForConditionalGeneration.from_pretrained(whisper_model_name).to(device)

def load_audio(audio_path):
  speech, sr = torchaudio.load(audio_path)
  resampler = torchaudio.transforms.Resample(sr, 16000)
  speech = resampler(speech)
  return speech.squeeze()

def get_transcription_whisper():
  # get the input features
  input_features = whisper_processor(load_audio(audio_url), sampling_rate=16000, return_tensors="pt").input_features.to(device)
  # get special decoder tokens for the language
  forced_decoder_ids = whisper_processor.get_decoder_prompt_ids(language="spanish", task="transcribe")
  # perform inference
  predicted_ids = whisper_model.generate(input_features, forced_decoder_ids=forced_decoder_ids)
  #decode the IDs to text
  transcription = whisper_processor.batch_decode(predicted_ids, skip_special_tokens=True)
  print(transcription[0])

get_transcription_whisper()