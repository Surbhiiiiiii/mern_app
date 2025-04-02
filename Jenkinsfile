pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        EC2_HOST = '13.60.25.60' // Store in Jenkins credentials for security
        SSH_KEY = credentials('your-aws-key')
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch:'main', url: 'https://github.com/Surbhiiiiiii/mern_app.git'
            }
        }
        stage('Build & Push Backend') {
            steps {
                sh 'docker build -t surbhi800/mern-backend ./backend'
                sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push surbhi800/mern-backend'
            }
        }
        stage('Build & Push Frontend') {
            steps {
                sh 'docker build -t surbhi800/mern-frontend ./frontend'
                sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push surbhi800/mern-frontend'
            }
        }
        stage('Deploy to AWS EC2') {
            steps {
                sshagent(['your-aws-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} <<EOF
                    docker stop backend_container frontend_container || true
                    docker rm backend_container frontend_container || true
                    docker pull surbhi800/mern-backend
                    docker pull surbhi800/mern-frontend
                    docker run -d --name backend_container -p 5000:5000 surbhi800/mern-backend
                    docker run -d --name frontend_container -p 3000:3000 --link backend_container surbhi800/mern-frontend
                    EOF
                    '''
                }
            }
        }
    }
}
