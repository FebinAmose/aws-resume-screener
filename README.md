# AI Resume Screener ⚡
> Serverless AI-powered resume analysis tool built on AWS + Claude AI (Amazon Bedrock)

![AWS](https://img.shields.io/badge/AWS-Lambda-FF9900?style=flat&logo=amazonaws&logoColor=white)
![Bedrock](https://img.shields.io/badge/Amazon-Bedrock-FF9900?style=flat&logo=amazonaws&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-Haiku-7C3AED?style=flat)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat&logo=nodedotjs&logoColor=white)
![Free Tier](https://img.shields.io/badge/AWS-Free%20Tier-3FB950?style=flat)

---

## What It Does

Paste your resume → Claude AI analyzes it → Get instant feedback for Indian cloud jobs.

The tool provides:
- Overall score out of 10 for AWS Cloud Developer roles
- Strengths and missing skills
- Top 3 actionable recommendations for the Indian job market
- Best job titles to apply for right now

---

## Architecture

```
User (Browser)
     │
     ▼
index.html (Frontend)
     │  HTTP POST /analyze
     ▼
Amazon API Gateway
     │  Proxy Integration
     ▼
AWS Lambda (Node.js 20.x)
     │  Converse API
     ▼
Amazon Bedrock
     │
     ▼
Claude Haiku (AI Analysis)
```

---

## Tech Stack

| Layer | Service | Purpose |
|-------|---------|---------|
| Frontend | HTML + CSS + JS | Resume input UI |
| API | Amazon API Gateway | REST endpoint |
| Compute | AWS Lambda (Node.js) | Business logic |
| AI | Amazon Bedrock + Claude Haiku | Resume analysis |
| Storage | Amazon S3 | Resume storage (ready) |
| Auth | AWS IAM | Secure permissions |

---

## AWS Free Tier Usage

| Service | Free Tier |
|---------|-----------|
| Lambda | 1M requests/month |
| API Gateway | 1M calls/month (12 months) |
| S3 | 5GB storage (12 months) |
| CloudWatch | 5GB logs |
| Bedrock/Claude Haiku | ~$0.002 per analysis |

---

## Project Structure

```
resume-screener/
├── lambda/
│   ├── index.js          # Lambda handler + Bedrock integration
│   ├── package.json      # Node.js dependencies
│   └── node_modules/     # AWS SDK packages
├── index.html            # Frontend UI
└── README.md
```

---

## Getting Started

### Prerequisites
- AWS Account (Free Tier)
- AWS CLI configured
- Node.js 20.x

### Deploy

**1. Clone the repo**
```bash
git clone https://github.com/febinamose/resume-screener.git
cd resume-screener
```

**2. Install dependencies**
```bash
cd lambda
npm install
```

**3. Create S3 bucket**
```bash
aws s3api create-bucket --bucket your-resume-screener --region us-east-1
```

**4. Create IAM role for Lambda**
```bash
aws iam create-role \
  --role-name resume-screener-lambda-role \
  --assume-role-policy-document file://trust-policy.json
```

**5. Deploy Lambda**
```bash
powershell Compress-Archive -Path .\* -DestinationPath ..\lambda.zip
aws lambda create-function \
  --function-name resume-screener \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/resume-screener-lambda-role \
  --handler index.handler \
  --zip-file fileb://../lambda.zip \
  --timeout 30 --memory-size 256 --region us-east-1
```

**6. Create API Gateway and deploy**
```bash
aws apigateway create-rest-api --name resume-screener-api --region us-east-1
# Follow setup steps for resource, method, integration, and deployment
```

**7. Update API URL in index.html**
```javascript
const API_URL = "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/analyze";
```

**8. Open index.html with Live Server in VS Code**

---

## Sample Output

```
Overall Score: 7.5/10

Strengths:
- Strong AWS serverless foundation (Lambda, API Gateway, DynamoDB)
- Node.js backend experience relevant to cloud roles
- Real project experience with Cognito authentication

Missing Skills:
- AWS Certification (Cloud Practitioner recommended)
- CI/CD pipeline experience (GitHub Actions, CodePipeline)
- Infrastructure as Code (CDK or CloudFormation)

Top 3 Recommendations:
1. Get AWS Cloud Practitioner certification
2. Add GitHub Actions CI/CD to existing projects
3. Build a full-stack project with React frontend

Best Job Titles to Apply:
- Junior Cloud Developer (Node.js)
- AWS Lambda Developer (Fresher)
- Associate Cloud Engineer
```

---

## Author

**Febin Amose F D**
Final Year IT Student | AWS Cloud Developer | Backend Developer

- LinkedIn: [linkedin.com/in/febinamose](https://www.linkedin.com/in/febinamose/)
- Email: febinamose123@gmail.com
- Location: Kanyakumari, India

---

## License

MIT License — feel free to use and modify for your own learning!