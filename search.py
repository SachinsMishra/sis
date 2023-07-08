import os
import PyPDF2

class SearchFiles:
    def __init__(self) -> None:
        pass

    def folder_exists(self,path):
        return os.path.exists(path=path)    
    
    def search_keyword_in_pdf(self,pdf_path, keyword):
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            matches = []
            for page in reader.pages:
                text = page.extract_text()
                lines = text.split('\n')
                for line in lines:
                    if keyword.lower() in line.lower():
                        matches.append(line.strip())
            return matches

    def search_keywords_in_directory(self,directory, keywords):
        results = {}
        for root, dirs, files in os.walk(directory):
            for filename in files:
                if filename.endswith('.pdf'):
                    file_path = os.path.join(root, filename)
                    # print(file_path)
                    matches = []
                    for keyword in keywords:
                        matches += self.search_keyword_in_pdf(file_path, keyword)
                    if matches:
                        results[file_path] = matches
        return results
    
    def get_result(self,directory,keywords):
        search_results = self.search_keywords_in_directory(directory, keywords)
        return search_results      
    
class Fixture:
    def __init__(self) -> None:
        self.demo=1
    
    def get_name(self,firstName,total):
        return "completed : "+firstName+" Sum of Option:"+str(total+self.demo)


# Set the directory and keywords
directory = 'C:\\Users\\MSUSERSL123\\Desktop\\pdf'
keywords = ['finance']

# # Search for keywords in the PDF files
# search_results = search_keywords_in_directory(directory, keywords)

# # Print the matching lines for each PDF file
# for filename, matches in search_results.items():
#     print('File:', filename)
#     for match in matches:
#         print('- ', match)
#     print()
