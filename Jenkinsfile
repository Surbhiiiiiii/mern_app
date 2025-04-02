pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/Surbhiiiiiii/mern_app.git'
            }
        }
        stage('Build & Push Backend') {
            steps {
                sh 'docker build -t yourdockerhubusername/mern-backend ./backend'
                sh 'docker login -u $DOCKER_HUB_CREDENTIALS_USR -p $DOCKER_HUB_CREDENTIALS_PSW'
                sh 'docker push yourdockerhubusername/mern-backend'
            }
        }
        stage('Build & Push Frontend') {
            steps {
                sh 'docker build -t yourdockerhubusername/mern-frontend ./frontend'
                sh 'docker push yourdockerhubusername/mern-frontend'
            }
        }
        stage('Deploy to AWS EC2') {
            steps {
                sshagent(['your-aws-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@13.60.36.27 <<EOF
                    docker pull yourdockerhubusername/mern-backend
                    docker pull yourdockerhubusername/mern-frontend
                    docker-compose down || true
                    docker-compose up -d
                    EOF
                    '''
                }
            }
        }
    }
}
