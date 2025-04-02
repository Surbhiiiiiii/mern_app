pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
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
                sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
                sh 'docker push surbhi800/mern-backend'
            }
        }
        stage('Build & Push Frontend') {
            steps {
                sh 'docker build -t surbhi800/mern-frontend ./frontend'
                sh 'docker push surbhi800/mern-frontend'
            }
        }
        stage('Deploy to AWS EC2') {
            steps {
                sshagent(['your-aws-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@13.60.36.27 <<EOF
                    docker pull surbhi800/mern-backend
                    docker pull surbhi800/mern-frontend
                    docker-compose down || true
                    docker-compose up -d
                    EOF
                    '''
                }
            }
        }
    }
}
