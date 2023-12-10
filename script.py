import requests
from bs4 import BeautifulSoup
import json

def fetch_readme_content(url):
    response = requests.get(url)

    if response.status_code == 200:
        print("Fetching README file from the URL...")
        content = response.text
        soup = BeautifulSoup(content, 'html.parser')
        return soup
    else:
        print(f"Failed to fetch README file from the URL. Status code: {response.status_code}")
        return None

def create_json_file(rows, header_values):
    data_list = []

    for row in rows[1:]:
        cell_values = [td.get_text(strip=True) for td in row.find_all(['td', 'th'])]
        cell_values[0] = cell_values[0].replace(' ', '')

        data_item = dict(zip(header_values, cell_values))
        data_list.append(data_item)

    json_content = json.dumps(data_list, ensure_ascii=False, indent=2)

    with open('table_data.json', 'w', encoding='utf-8') as json_file:
        json_file.write(json_content)

    print("Successfully created table_data.json with modified app names.")

if __name__ == "__main__":
    # URL of the README file
    readme_url = 'https://github.com/swaggyP36000/TrollStore-IPAs/blob/main/README.md'

    # Fetch the content of the README file from the URL
    soup = fetch_readme_content(readme_url)

    if soup:
        # Find the paragraph containing the specified text
        paragraph_with_text = soup.find('p', string=lambda text: 'Everything you can currently find in this repo:' in str(text))

        # Check if the paragraph is found
        if paragraph_with_text:
            print("Found the paragraph with the specified text.")

            # Find the table within the paragraph
            table = paragraph_with_text.find_next('table')

            # Check if the table is found
            if table:
                print("Found the table after the specified text in the README file.")

                # Find all rows in the table
                rows = table.find_all('tr')

                # Get header values
                header_values = [th.get_text(strip=True) for th in rows[0].find_all('th')]

                # Create JSON file
                create_json_file(rows, header_values)

            else:
                print("Table not found after the specified text in the README file.")
        else:
            print("Paragraph with the specified text not found in the README file.")
