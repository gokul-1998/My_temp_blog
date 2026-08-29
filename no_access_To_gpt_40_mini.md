(venv) PS D:\repos\fastapi_db\fastapi_db\fastapi_db> python ss.py

Traceback (most recent call last):
  File "D:\repos\fastapi_db\fastapi_db\fastapi_db\ss.py", line 17, in <module>
    response = client.complete(
               ^^^^^^^^^^^^^^^^
  File "D:\repos\fastapi_db\fastapi_db\fastapi_db\venv\Lib\site-packages\azure\ai\inference\_patch.py", line 738, in complete
    raise HttpResponseError(response=response)
azure.core.exceptions.HttpResponseError: (no_access) No access to model: /gpt-4o-mini
Code: no_access
Message: No access to model: /gpt-4o-mini

# probblme
 - need to provide model read permission in github token generation
 - if you create a new token from thr below page . by default you will get the permission , so you will get the error as above
 <img width="1197" height="866" alt="image" src="https://github.com/user-attachments/assets/b68553d7-d073-460e-b6bd-53db724cfd86" />

# solution
- if you come from here
-   - https://github.com/marketplace/models/azure-openai/o4-mini
    - - <img width="865" height="672" alt="image" src="https://github.com/user-attachments/assets/391d5121-f474-4683-adac-0043d94efd5c" />
    - <img width="829" height="868" alt="image" src="https://github.com/user-attachments/assets/ec19b35e-d992-44c0-b458-5cd518fce194" />

- we will get the proper access. 
