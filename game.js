class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.snake = [{x: 5, y: 5}];
        this.direction = 'right';
        this.food = this.generateFood();
        this.score = 0;
        this.gameOver = false;
        this.paused = false;

        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }

    generateFood() {
        const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
        const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
        return {x, y};
    }

    handleKeyPress(event) {
        if (this.paused) return;

        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };

        const newDirection = keyMap[event.key];
        if (!newDirection) return;

        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };

        if (opposites[newDirection] !== this.direction) {
            this.direction = newDirection;
        }
    }

    moveSnake() {
        const head = {...this.snake[0]};
        
        switch(this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.handleGameOver();
            return;
        }

        // Check collision with self
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.handleGameOver();
            return;
        }

        this.snake.unshift(head);

        // Check if snake ate food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('score').textContent = this.score;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }

    handleGameOver() {
        this.gameOver = true;
        this.paused = true;
        
        triviaManager.showTriviaModal(
            // Correct answer callback
            () => {
                this.continueGame();
            },
            // Wrong answer callback
            () => {
                this.resetGame();
            }
        );
    }

    continueGame() {
        // מיקום מחדש של הנחש במרכז המסך
        const centerX = Math.floor((this.canvas.width / this.gridSize) / 2);
        const centerY = Math.floor((this.canvas.height / this.gridSize) / 2);
        
        this.snake = [{x: centerX, y: centerY}];
        this.direction = 'right';
        this.gameOver = false;
        this.paused = false;
        
        // וידוא שהאוכל לא נמצא קרוב מדי לנחש
        this.food = this.generateSafeFood();
    }

    generateSafeFood() {
        let food;
        do {
            food = this.generateFood();
        } while (
            // וידוא שהאוכל לא קרוב מדי לנחש
            Math.abs(food.x - this.snake[0].x) < 3 &&
            Math.abs(food.y - this.snake[0].y) < 3
        );
        return food;
    }

    resetGame() {
        this.snake = [{x: 5, y: 5}];
        this.direction = 'right';
        this.food = this.generateFood();
        this.score = 0;
        this.gameOver = false;
        this.paused = false;
        document.getElementById('score').textContent = this.score;
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = 'green';
        this.snake.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // Draw food
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
    }

    gameLoop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        
        const elapsed = timestamp - this.lastTime;

        if (elapsed > 100 && !this.paused) { // Update every 100ms
            this.moveSnake();
            this.draw();
            this.lastTime = timestamp;
        }

        requestAnimationFrame(this.gameLoop);
    }
}

// Start the game when the page loads
window.onload = () => {
    new SnakeGame();
}; 