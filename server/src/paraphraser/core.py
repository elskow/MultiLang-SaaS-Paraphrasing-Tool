from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import warnings

class ParaphraseException(Exception):
    pass

class Paraphraser:
    def __init__(self, model, tokenizer, device):
        self.device = device
        self.tokenizer = tokenizer
        self.model = model.to(self.device)
        warnings.filterwarnings("ignore", category=UserWarning, module="transformers")
    def set_device(self, device):
        self.device = device
        self.model = self.model.to(self.device)

    def _generate_output(self, encoding):
        try:
            outputs = self.model.generate(
                input_ids=encoding["input_ids"], attention_mask=encoding["attention_mask"],
                max_length=2048,
                do_sample=True,
                top_k=120,
                top_p=0.95,
            )
            return outputs
        except Exception as e:
            raise ParaphraseException(f"An error occurred: {e}")

    def paraphrase(self, sentence):
        prompt =  "paraphrase: " + sentence
        encoding = self.tokenizer(prompt, padding='longest', truncation=True, max_length=2048, return_tensors="pt").to(self.device)
        outputs = self._generate_output(encoding)
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)

def create_paraphraser(model_name, device):
    tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    return Paraphraser(model, tokenizer, device)