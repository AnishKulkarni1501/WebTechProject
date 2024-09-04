import requests

# Replace 'your_api_key' with your actual API key
api_key = '9a7cc609184645cf936bf224815e95bc'
base_url = 'https://api.football-data.org/v4/competitions/PL/matches'

headers = {
    'X-Auth-Token': api_key
}

# Specify the number of matches you want to retrieve
params = {
    'status': 'SCHEDULED',  # Only get upcoming matches
    'limit': 100  # Attempt to get 100 matches (check API documentation for exact parameter)
}

response = requests.get(base_url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    matches = data.get('matches', [])
    
    for match in matches:
        home_team = match['homeTeam']['name']
        away_team = match['awayTeam']['name']
        match_date = match['utcDate']
        
        print(f"{home_team} vs {away_team} on {match_date}")
else:
    print(f"Failed to retrieve data: {response.status_code}")
