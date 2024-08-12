from http import HTTPStatus
import requests, dashscope, torch
import numpy as np
from PIL import Image
from io import BytesIO



class DashScopeFLUXAPI:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": (
                    [
                        "flux-schnell", "flux-dev", "flux-merged",
                    ],
                    {
                        "default": "flux-schnell"
                    }
                ),
                "api_key": ("STRING", {"multiline": False, "default": "",}),
                "prompt": ("STRING", {"multiline": True, "default": "",}),
                "size": (
                    [
                        "512*1024", "768*512", "768*1024", "1024*576", "576*1024", "1024*1024"
                    ],
                    {
                        "default": "1024*1024"
                    }
                ),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "steps": ("INT", {"default": 30, "min": 1, "max": 50, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "call_api"
    CATEGORY = "DashScope"

    def preprocess_image(self, image):
        image = torch.Tensor(np.array(image, dtype=np.float32) * (1 / 255))
        return image

    def call_api(self, model, api_key, prompt, size, seed, steps):
        dashscope.api_key=api_key
        rsp = dashscope.ImageSynthesis.call(model=model, prompt=prompt, size=size, seed=seed, steps=steps)
        if rsp.status_code == HTTPStatus.OK:
            print(rsp.output)
            print(rsp.usage)
            response = requests.get(rsp.output.results[0].url)
            img = Image.open(BytesIO(response.content))
            img = self.preprocess_image(img)
            return ([img],)
        else:
            print('Failed, status_code: %s, code: %s, message: %s' %
                (rsp.status_code, rsp.code, rsp.message))


