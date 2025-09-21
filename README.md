# 🕵️‍♂️ TruthLens: Focus On Facts, Blur The False 🌐

TruthLens is a cutting-edge AI-powered platform dedicated to combating the rapid spread of misinformation across digital media. In today’s hyper-connected, fast-paced information landscape, false narratives can circulate within seconds—shaping opinions, fueling confusion, and eroding trust.

With a mission rooted in trust, transparency, and accountability, TruthLens leverages advanced machine learning and real-time content validation to verify authenticity as it happens. Unlike traditional fact-checking approaches, TruthLens operates dynamically, empowering media houses, platforms, and everyday users to distinguish between truth and manipulation instantly

---

## 🚀 Features
- **Real-Time Verification**: Validate text, and videos instantly.
- **Multimodal Detection**: Simultaneously analyze text, images, and videos to detect manipulation using AI.
- **Dynamic Hashtag Context Analysis**: Predict the relevance and intent of trending hashtags using real-time semantic analysis 🔖.
- **Profile Behavior Scoring**: Assess social media profiles based on historical behavior for credibility scoring 📊.
- **Dual-Pipeline Architecture**:
  - **Data Extraction Pipeline**: Processes live data for context using visual analysis, sentiment detection, and more.
  - **Validation Pipeline**: Ensures credibility via redundancy-aware APIs, knowledge graphs, and fact-checking tools.

---

## 📈 Achievements
- **Finetuned NLI Model**: Achieved 94% accuracy in identifying contradictions, entailments, and neutral views by fine-tuning xlm-RoBERTa model.
- **Speech-to-Text**: Achieved 96%+ accuracy using Google Speech Recognition API.
- **Deepfake Detection**: Models achieved an 89% accuracy rate in detecting manipulated content.
- **Sentiment Analysis**: State-of-the-art results with 96% accuracy using a finetuned twitter-RoBERTa model.
- **Named Entity Recognition**: Levereaged GLiNER (Generalist and Lightweight Model for Named Entity Recognition) for accurate NER over news reports.

---

## 🛠️ Tech Stack
- **Programming Languages**: Python (Backend), HTML/CSS/JS with Tailwind (Frontend)
- **Libraries and Frameworks**: 
  - TensorFlow, PyTorch for AI/ML
  - OpenCV, PIL, OCR.space, Google Lens for image processing
  - Hugging Face Transformers, NLTK, SpaCy for NLP tasks
- **Databases**: MongoDB (data storage), Neo4j (Knowledge Graph mapping)
- **Cloud Platforms**: Google Cloud Platform (storage and APIs), Firebase (authentication)
- **APIs**: SightEngine (Deepfake detection), Google Fact Check Tools API

---

## 🌟 Key Tools and Modules
- **Web-Based Toolkit**:
  - Scrapes and validates data from news websites and live platforms.
  - Implements tools like article scrapers and tweet scrapers for context-rich verification.
- **Social Media Toolkit**:
  - Analyzes interaction networks for credibility assessment.
  - Predicts trending hashtags and validates social media content in real time.
- **True Source Tool**:
  - Maps relationships between trusted sources using a knowledge graph.

---

## 🎯 Dashboard Features
- User and broadcaster-friendly interface for verifying articles and news sources.
- Provides real-time statistics on verified news, flagged reports, and geotagged inputs from the community.
- Promotes transparency and competition among broadcasters.

---

## 💻 Installation Guide
1. Clone the repository:
   ```bash
   git clone https://github.com/hemangjain17/TruthLens.git
   ```
2. Navigate to the directory:
   ```bash
   cd TruthLens
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend:
   ```bash
   python backend/main.py
   ```
5. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

---

## 🎯 Run Specific Functionalities

If you want to check out some specific functionalities, you can directly execute files from the following directories:
1. Run text-based functionalities (e.g., Fake News Detection)
```bash
    python text/fake_news_detection.py
   ```

2. Run audio-based functionalities (e.g., Speech to Text or Sentiment Analysis)
```bash
    python audio/SpeechToText/AudioProcessor.py
    python audio/AudioSentimentAnalysis.py
   ```

3. Run image-based functionalities (e.g., Deepfake Detection or OCR)
```bash
    python images/deepfake_detection.py
    python images/OCR.py
   ```

