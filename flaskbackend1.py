from flask import Flask, render_template, jsonify
import requests
from datetime import datetime

app = Flask(__name__)

api_key = '9a7cc609184645cf936bf224815e95bc'
base_url = 'https://api.football-data.org/v4/competitions/PL/matches'
headers = {'X-Auth-Token': api_key}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/next_match')
def next_match():
    params = {'status': 'SCHEDULED', 'limit': 5}
    response = requests.get(base_url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        matches = data.get('matches', [])
       
        if matches:
            upcoming_matches = []
            for match in matches:
                home_team = match['homeTeam']['name']
                away_team = match['awayTeam']['name']
                match_date_str = match['utcDate']
                match_date = datetime.strptime(match_date_str, '%Y-%m-%dT%H:%M:%SZ')

                upcoming_matches.append({
                    'home_team': home_team,
                    'away_team': away_team,
                    'match_date': match_date_str,
                })
            
            return jsonify({'matches': upcoming_matches})
    return jsonify({'error': 'Failed to retrieve match data'})


if __name__ == '__main__':
    app.run(debug=True)
