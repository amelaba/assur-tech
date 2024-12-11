from flask import Flask, request, jsonify
import cv2
import numpy as np

app = Flask(__name__)


def compare_images(img1_path, img2_path):

    img1 = cv2.imread(img1_path, 0)  
    img2 = cv2.imread(img2_path, 0)

   
    from skimage.metrics import structural_similarity as ssim

    score, diff = ssim(img1, img2, full=True)
    return score  

@app.route('/upload', methods=['POST'])
def upload_image():
    file1 = request.files['image1']
    file2 = request.files['image2']


    img1_path = "image1.jpg"
    img2_path = "image2.jpg"
    file1.save(img1_path)
    file2.save(img2_path)


    similarity = compare_images(img1_path, img2_path)

    return jsonify({'similarity': similarity})

if __name__ == '__main__':
    app.run(debug=True)
