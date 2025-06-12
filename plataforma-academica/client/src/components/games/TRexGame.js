import React, { useRef, useEffect, useState } from 'react';
import './TRexGame.css';

const TRexGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'gameOver'

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = {
      speed: 6,
      gravity: 0.6,
      jumpForce: -15,
      groundY: canvas.height - 40,
      obstacles: [],
      trex: {
        x: 50,
        y: canvas.height - 40,
        width: 40,
        height: 40,
        velocity: 0,
        jumping: false,
      },
      reset() {
        this.obstacles = [];
        this.trex.y = this.groundY;
        this.trex.jumping = false;
        this.trex.velocity = 0;
      },
      update(deltaTime) {
        if (gameState !== 'playing') return;

        // Update T-Rex
        if (this.trex.jumping) {
          this.trex.y += this.trex.velocity;
          this.trex.velocity += this.gravity;

          if (this.trex.y > this.groundY) {
            this.trex.y = this.groundY;
            this.trex.jumping = false;
            this.trex.velocity = 0;
          }
        }

        // Generate obstacles
        if (Math.random() < 0.02) {
          this.obstacles.push({
            x: canvas.width,
            width: 20 + Math.random() * 30,
            height: 40 + Math.random() * 20,
          });
        }

        // Update obstacles
        this.obstacles.forEach((obstacle, index) => {
          obstacle.x -= this.speed;

          // Check collision
          if (this.checkCollision(obstacle)) {
            setGameState('gameOver');
            setHighScore((prev) => Math.max(prev, score));
          }

          // Remove off-screen obstacles and update score
          if (obstacle.x + obstacle.width < 0) {
            this.obstacles.splice(index, 1);
            setScore((prev) => prev + 1);
          }
        });
      },
      checkCollision(obstacle) {
        return (
          this.trex.x < obstacle.x + obstacle.width &&
          this.trex.x + this.trex.width > obstacle.x &&
          this.trex.y + this.trex.height > this.groundY - obstacle.height
        );
      },
      draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw ground
        ctx.beginPath();
        ctx.moveTo(0, this.groundY + this.trex.height);
        ctx.lineTo(canvas.width, this.groundY + this.trex.height);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // Draw T-Rex
        ctx.fillStyle = '#333';
        ctx.fillRect(this.trex.x, this.trex.y, this.trex.width, this.trex.height);

        // Draw obstacles
        ctx.fillStyle = '#666';
        this.obstacles.forEach((obstacle) => {
          ctx.fillRect(
            obstacle.x,
            this.groundY - obstacle.height + this.trex.height,
            obstacle.width,
            obstacle.height
          );
        });

        // Draw score
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 20, 30);

        if (gameState === 'gameOver') {
          ctx.fillStyle = 'red';
          ctx.font = '30px Arial';
          ctx.fillText('Game Over! Press Enter to Restart', 50, canvas.height / 2);
        }
      },
    };

    const gameLoop = (time = 0) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      game.update(deltaTime);
      game.draw();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    let animationFrameId;
    let lastTime = 0;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && gameState === 'playing' && !game.trex.jumping) {
        game.trex.jumping = true;
        game.trex.velocity = game.jumpForce;
      }

      if (e.code === 'Enter' && gameState === 'gameOver') {
        setScore(0);
        setGameState('playing');
        game.reset();
      }

      if (e.code === 'Enter' && gameState === 'ready') {
        setGameState('playing');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [score, gameState]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        style={{ border: '1px solid black' }}
      ></canvas>
      <div>High Score: {highScore}</div>
      {gameState === 'ready' && <div>Press Enter to Start</div>}
    </div>
  );
};

export default TRexGame;
