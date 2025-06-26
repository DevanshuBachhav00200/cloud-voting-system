
# 🗳️ Cloud-Based Voting System

This project is a simple, responsive, and interactive **voting system** built with:
- **Frontend**: HTML, CSS, JavaScript, Chart.js  
- **Backend**: Node.js + Express  
- **Database**: Google Firestore (NoSQL)  
- **Cloud Platform**: Google Cloud Platform (GCP) — Cloud Run + Firestore  

Votes are stored in Firestore and visualized live using Chart.js in the browser.

## 🌐 Live Demo

> 🔗 [https://cloud-voting-api-1018102396253.asia-south1.run.app]

## 🧱 Folder Structure

```
cloud-voting-system/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── chart.js          # Optional if not using CDN
├── Dockerfile
├── index.js              # Backend (Node.js server)
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Features

- ✅ Cast vote for "Option A" or "Option B"
- 📊 See **live vote count** in a bar chart
- ☁️ All data is stored in **Google Firestore**
- 🔁 Real-time chart updates
- 🔐 CORS-enabled API for frontend access
- 🖥️ Responsive UI with a clean design

## ⚙️ Technologies Used

| Layer     | Tools Used                     |
|-----------|--------------------------------|
| Frontend  | HTML, CSS, JavaScript, Chart.js |
| Backend   | Node.js, Express               |
| Database  | Google Firestore               |
| Cloud     | Google Cloud Run, Cloud Build  |
| Deployment | Docker, GCP Console/Cloud Shell |

## 🛠️ Setup Instructions (Step-by-Step)

### 🔧 Prerequisites

- Node.js and npm installed
- Google Cloud account and billing enabled
- Firestore database in Native mode
- GCP project created

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/DevanshuBachhav00200/cloud-voting-system.git
cd cloud-voting-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Firestore Project on GCP

- Go to [console.cloud.google.com](https://console.cloud.google.com)
- Create a project (e.g., `cloud-voting-system`)
- Enable:
  - Firestore
  - Cloud Run
  - Cloud Build
  - Artifact Registry (optional)
- In Firestore, create a **collection named `votes`** (documents will be added automatically)

### 4️⃣ Deploy Backend on Cloud Run

```bash
gcloud builds submit --tag gcr.io/cloud-voting-system/cloud-voting-api
gcloud run deploy cloud-voting-api   --image gcr.io/cloud-voting-system/cloud-voting-api   --platform managed   --region asia-south1   --allow-unauthenticated
```

☁️ Replace `cloud-voting-system` with your real project ID.

### 5️⃣ Update Frontend URL

In `script.js`:

```js
const apiUrl = 'https://<your-cloud-run-url>';
```

### 6️⃣ Open Frontend in Live Server

```bash
cd frontend
# Use VS Code "Live Server" extension or open index.html directly
```

## 🔄 API Endpoints

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| POST   | `/vote`        | Submit a vote       |
| GET    | `/results`     | Get all vote counts |

Request Body (POST):
```json
{ "option": "Option A" }
```

Response (GET):
```json
{
  "Option A": 5,
  "Option B": 3
}
```

## ✅ Known Issues & Fixes

| Issue                           | Solution |
|--------------------------------|----------|
| CORS errors                    | Ensure `app.use(cors())` is added in backend |
| 500 error on `/results`        | Ensure Firestore is initialized and collection is correct |
| Chart not showing              | Make sure canvas is loaded before `getContext()` |
| Votes not updating             | Check Firestore permissions & Cloud Run logs |

## 📸 Screenshots

| Cast Vote | Live Results |
|-----------|--------------|
| ![vote](https://via.placeholder.com/300x200) | ![chart](https://via.placeholder.com/300x200) |

## 👨‍💻 Author

**Devanshu Bachhav**

> ✉️ [Add your email or GitHub profile]  
> 🐙 GitHub: [DevanshuBachhav00200](https://github.com/DevanshuBachhav00200)

## 📄 License

This project is licensed under the MIT License.
