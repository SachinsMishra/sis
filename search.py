import os
import PyPDF2
import fitz  # PyMuPDF
import threading
import asyncio
import websockets
import random


class SearchFiles:
    def __init__(self) -> None:
        pass

    def folder_exists(self,path):
        return os.path.exists(path=path)    
    
    def search_keyword_in_pdf(self,filename, keywords, results,ignore_case,exact_match):
        matching_lines = []

        doc = fitz.open(filename)
       
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            text = page.get_text()

            # Split the text into lines
            lines = text.split("\n")

            # Check each line for any of the patterns
            count=0;
            for line in lines:
                count+=1
                for keyword in keywords:
                    data = {
                                "page_num":page_num,
                                "line":line,
                                "line_no":count,
                                "keyword":keyword
                         };
                    if exact_match and (keyword in line.split()):
                         matching_lines.append(data);
                    elif exact_match==False and ignore_case and keyword.lower() in line.lower():
                         matching_lines.append(data);
                    elif exact_match==False and keyword in line:
                         matching_lines.append(data);
                # if any(pattern in line for pattern in keywords):
                #     matching_lines.append({
                #                 "page_num":page_num,
                #                 "line":line,
                #                 "line_no":count,
                #                 "keyword":pattern
                #     })
        doc.close()
        
        if matching_lines:
            results.append({
                "file_name":filename.split("\\")[-1],
                "file_path":filename,
                "matching_lines":matching_lines
            })
    
    def search_keywords_in_files(self,directory, keywords,ignore_case,exact_match):
        files_with_keywords = []
        threads = []
        results_lock = threading.Lock()

        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path) and file_path.lower().endswith('.pdf'):
                thread = threading.Thread(target=self.search_keyword_in_pdf, args=(file_path, keywords, files_with_keywords,ignore_case,exact_match))
                thread.start()
                threads.append(thread)

        for thread in threads:
            thread.join()

        return files_with_keywords

    def search_keywords_in_directory(self,directory, keywords):
        results = {}
        for root, dirs, files in os.walk(directory):
            for filename in files:
                if filename.endswith('.pdf'):
                    file_path = os.path.join(root, filename)
                    # print(file_path)
                    #matches = []
                    results[file_path] = self.search_keyword_in_pdf(file_path, keywords)
        return results
    
    def get_result(self,directory,keywords,ignore_case,exact_match):
        results = self.search_keywords_in_files(directory, keywords,ignore_case,exact_match)
        return results      
            
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
