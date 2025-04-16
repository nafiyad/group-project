pipeline {
    agent any
    
    environment {
        // Define environment variables for AWS ECR
        AWS_ACCOUNT_ID = '123456789012' // Replace with your AWS account ID
        AWS_REGION = 'us-east-1' // Replace with your AWS region
        ECR_REPOSITORY = 'group11-react-app' // Replace with your ECR repository name
        DOCKER_IMAGE_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}"
        DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Build') {
            agent {
                docker { 
                    image 'node:22.14.0-alpine' 
                    reuseNode true
                }
            }
            
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm install
                    npm run build
                    ls -la
                '''
            }
        }

        stage('Test') {
            agent {
                docker { 
                    image 'node:22.14.0-alpine' 
                    reuseNode true
                }
            }
            
            steps {
                sh '''
                   test -f build/index.html
                   npm test
                '''
            }
        }
        
        stage('Build My Docker Image') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                }
            }
            steps {
                sh '''
                    amazon-linux-extras install docker
                    docker build -t my-docker-image .
                '''
            }
        }
    }
} 