import React, { useState } from 'react';

const HowToPlay = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <style>
        {`
          body {
            background-color: #f4f4f4;
            margin: 0;
            font-family: 'Poppins', sans-serif;
            color: #333;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #222;
            color: white;
            padding: 15px 20px;
            position: sticky;
            top: 0;
            z-index: 1000;
          }

          h1 {
            margin: 0;
            font-size: 26px;
          }

          .menu-icon {
            font-size: 30px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .menu-icon:hover {
            background-color: #444;
            border-radius: 5px;
          }

          .side-menu {
            height: 100%;
            width: ${menuOpen ? '250px' : '0'};
            position: fixed;
            top: 55px;
            left: 0;
            background-color: #333;
            overflow: hidden;
            transition: width 0.3s ease, opacity 0.3s ease;
            padding-top: 20px;
            z-index: 1001;
            display: ${menuOpen ? 'block' : 'none'};
            opacity: ${menuOpen ? '1' : '0'};
          }

          .side-menu a {
            padding: 10px 15px;
            text-decoration: none;
            font-size: 18px;
            color: white;
            display: block;
            transition: background-color 0.3s;
          }

          .side-menu a:hover {
            background-color: #555;
          }

          .close-button {
            font-size: 24px;
            padding: 10px 15px;
            text-align: right;
            cursor: pointer;
            color: white;
            transition: color 0.3s;
          }

          .close-button:hover {
            color: #ff4b4b;
          }

          #overlay {
            display: ${menuOpen ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
          }

          main {
            padding: 20px;
            background-color: #fff;
            max-width: 1200px;
            margin: 20px auto;
            border-radius: 5px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          h2 {
            font-size: 28px;
            margin-bottom: 15px;
            color: #444;
          }

          p, li {
            font-size: 18px;
            line-height: 1.8;
            margin-bottom: 12px;
          }

          ul, ol {
            margin-left: 20px;
          }

          .footer {
            background-color: #222;
            color: white;
            text-align: center;
            padding: 10px;
            position: relative;
          }

          .footer .social-icons {
            position: absolute;
            bottom: 10px;
            right: 20px;
          }

          .footer .social-icons a {
            color: white;
            text-decoration: none;
            margin-left: 15px;
            font-size: 22px;
            transition: color 0.3s;
          }

          .instagram:hover {
            color: rgb(73, 20, 135);
          }

          .twitter:hover {
            color: rgb(0, 187, 249);
          }

          .yt:hover {
            color: rgb(255, 0, 0);
          }

          .telegram:hover {
            color: rgb(0, 172, 255);
          }
        `}
      </style>

      <header>
        <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
        <h1>How to Play</h1>
      </header>

      <div className="side-menu">
        <div className="close-button" onClick={toggleMenu}>✖</div>
        <a href="/">Home</a>
        <a href="/leaderboard">Leader Board</a>
        <a href="/upcoming-matches">Upcoming Matches</a>
        <a href="/results">Results</a>
        <a href="/manageteam">Manage Team</a>
        <a href="/about">About</a>
        <a href="/userinfo">User Info (only if signed-in)</a>
      </div>

      <div id="overlay" onClick={toggleMenu}></div>

      <main>
        <section className="intro">
          <h2>Welcome to Fantasy Football!</h2>
          <p>Fantasy Football is a game where you manage a team of real-world football players and score points based on their actual performances in matches. The goal is to assemble the best team and score the most points each gameweek.</p>
        </section>

        <section className="how-to-play">
          <h2>How to Play</h2>
          <ol>
            <li><strong>Create Your Team:</strong> Select players within a budget to form your fantasy team of 11 players.</li>
            <li><strong>Set Your Formation:</strong> Choose your formation (e.g., 4-4-2, 3-5-2) by deciding how many defenders, midfielders, and attackers to play.</li>
            <li><strong>Choose Your Captain:</strong> Pick a captain who will score double points for that week.</li>
            <li><strong>Make Transfers:</strong> You can make transfers each gameweek to improve your team by swapping out players.</li>
            <li><strong>Score Points:</strong> Points are awarded based on real-life player performances in matches (goals, assists, clean sheets, etc.).</li>
            <li><strong>Compete:</strong> Compete against other players and climb the leaderboards.</li>
          </ol>
        </section>

        <section className="scoring-system">
          <h2>Scoring System</h2>
          <ul>
            <li><i className="fas fa-futbol"></i> <strong>Goal Scored (Forward):</strong> 4 points</li>
            <li><i className="fas fa-futbol"></i> <strong>Goal Scored (Midfielder):</strong> 5 points</li>
            <li><i className="fas fa-futbol"></i> <strong>Goal Scored (Defender):</strong> 7 points</li>
            <li><i className="fas fa-hand-holding-heart"></i> <strong>Assist:</strong> 3 points</li>
            <li><i className="fas fa-shield-alt"></i> <strong>Clean Sheet (Defender/Goalkeeper):</strong> 4 points/5 points</li>
            <li><i className="fas fa-square"></i> <strong>Yellow Card:</strong> -3 points</li>
            <li><i className="fas fa-square"></i> <strong>Red Card:</strong> -10 points</li>
          </ul>
        </section>

        <section className="faq">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <p><strong>Q: Can I change my team after the season starts?</strong><br/>A: Yes, you can make transfers each week.</p>
          <p><strong>Q: How many players can I transfer in one week?</strong><br/>A: You can transfer as many players as you want, but only one free transfer is available per week. Additional transfers will cost points.</p>
        </section>
      </main>

      <footer className="footer">
        &copy; Ultimate Fantasy League
        <div className="social-icons">
          <a href="#" target="_blank" className="instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" target="_blank" className="twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" target="_blank" className="yt"><i className="fab fa-youtube"></i></a>
          <a href="#" target="_blank" className="telegram"><i className="fab fa-telegram"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default HowToPlay;
