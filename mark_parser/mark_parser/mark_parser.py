from os import listdir
from os.path import isfile, join
import sys

import json
import os
env_dist = os.environ 


project_json = env_dist.get('HOME') + '/.mp_project.json'

class MPProject:
  def __get_project_path__(self, project_id):
    "读取文件"
    print(">>>>>>> from markparser:", project_id)
    if not os.path.exists(project_json):
      f =  open(project_json, 'w')
      f.write("{}")
      f.close()

    with open(project_json,'r') as load_f:
      return json.load(load_f)[project_id]["path"]



  def __init__(self, project_id):
    dir_path = self.__get_project_path__(project_id)
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    self.mark_json = dir_path + "/mark.json"
    self.save_json = dir_path + "/save.json"
    self.config_json = dir_path + "/config.json"


def add(path):
  config_dict = __read_config__()

  mypath = os.path.abspath(path)

  if "paths" in config_dict:
    config_dict["paths"].append(mypath)
  else:
    config_dict["paths"] = [mypath]

  __save_config__(config_dict)


pattern = "(section-begin:\d+)|(section-ref:\d+)" 

def getall():
  config_dict =  __read_config__()
  data_dict = {}
  global pattern

  pathfiles = []

  for config_id in  config_dict:
    config_type = config_dict[config_id]["type"] 
    if config_type == "directory":
      for root, dirs, files in os.walk(config_dict[config_id]["path"], topdown=True):
        filtered_path_1 = [os.path.join(root, name) for name in files]
        filtered_path_2 = [f for f in filtered_path_1 if not re.match(".*.git", f)]
        pathfiles = [f for f in filtered_path_2 if re.match(".*\.md$|.*\.py$", f)]
    if config_type == "file":
      pathfiles.append(config_dict[config_id]["path"])

  pathfiles = list(set(pathfiles))
  result = {} 
  for f in pathfiles:
    result[f] = "0"
  print(json.dumps(result))



def updateall(project_id):

  config_dict =  __read_config__(project_id)
  data_dict = {}
  global pattern

  pathfiles = []

  for config_id in  config_dict:
    config_type = config_dict[config_id]["type"] 
    if config_type == "directory":
      for root, dirs, files in os.walk(config_dict[config_id]["path"], topdown=True):
        filtered_path_1 = [os.path.join(root, name) for name in files]
        filtered_path_2 = [f for f in filtered_path_1 if not re.match(".*.git", f)]
        pathfiles = [f for f in filtered_path_2 if re.match(".*\.md$|.*\.py$", f)]
    if config_type == "file":
      pathfiles.append(config_dict[config_id]["path"])


  pathfiles = list(set(pathfiles))

  for f in pathfiles:
    print(f)
    result = __parse_file__(f, pattern)
    if result:
      data_dict[f] =  result

  __save__(data_dict, project_id)



def update(target_file):
  global pattern
  target_file = os.path.abspath(target_file)

  data_dict = __read__()
  data_dict[target_file] = __parse_file__(target_file, pattern)
  __save__(data_dict, project_id)



def search(search_pattern):
  result = {} 
  data_dict = __read__()
  for k, v in data_dict.items():
    if search_pattern in v:
      result[k] = v[search_pattern]["linenum"]
  print(json.dumps(result))



def __save__(data, project_id):
  "保存dict为json"
  mark_json = MPProject(project_id).mark_json
  with open(mark_json, 'w+') as outfile:
    json.dump(data, outfile)          

def __read__():
  "读取文件"
  mark_json = MPProject("Project_id").mark_json
  if not os.path.exists(mark_json):
    f =  open(mark_json, 'w')
    f.write("{}")
    f.close()

  with open(mark_json,'r') as load_f:
    return json.load(load_f)


def __save_config__(config):
  "保存dict为json"
  config_json = MPProject("Project_id").config_json
  with open(config_json, 'w+') as outfile:
    json.dump(config, outfile)          


def __read_config__(project_id):
  "读取文件"
  config_json = MPProject(project_id).config_json
  if not os.path.exists(config_json):
    f =  open(config_json, 'w')
    f.write("{}")
    f.close()

  with open(config_json,'r') as load_f:
    return json.load(load_f)


import re

def __get_content__(target_file, mark):
  try:
    begin_pattern = mark
    end_pattern = mark.replace("begin", "end")

    result = "..."
    with open(target_file,'r') as parse_f:
      f = parse_f.read()
      start = f.find(begin_pattern)
      stop = f.find(end_pattern)
      result = f[start + len(begin_pattern) : stop]

    return result
  except FileNotFoundError:
    print("[fault]The file "+target_file+" can't find.")
    return "[fault]The file "+target_file+" can't find."

def __parse_file__(target_file, pattern):
  "分析文件中的mark, 并生成dict"
  data_dict = {}
  try:
    with open(target_file,'r') as parse_f:
      end_pattern='.*\n'
      line=[]
      text = parse_f.read() + "\n"
      for m in re.finditer(end_pattern, text):
          line.append(m.end())

      last_index = 0
      last_match = None
      text_before_match = ""

      title_pattern =  "title:([^\r\n]*)"

      title_pattern = re.compile(title_pattern, re.U)

      match=re.compile(pattern, re.MULTILINE|re.DOTALL)
      for m in re.finditer(match, text):
        if last_match:
          text_before_match = text[last_index:m.start()]
          title_match = title_pattern.search(text_before_match)
          if title_match:
            data_dict[last_match]["title"] = title_match.group(1)
          else:
            data_dict[last_match]["title"] = ""

        linenum = \
          next(i for i in range(len(line)) if line[i]>m.start(0))
        if m.group(0):
          if m.group(0) in data_dict:
            data_dict[m.group(0)]["linenum"].append(linenum)
          else:
            data_dict[m.group(0)] = {}
            data_dict[m.group(0)]["linenum"] = [ linenum ]

        last_match = m.group(0)
        last_index = m.end()

      if last_match:
        text_before_match = text[last_index:-1]
        title_match = title_pattern.search(text_before_match)
        if title_match:
          data_dict[last_match]["title"] = title_match.group(1)
        else:
          data_dict[last_match]["title"] = ""


  except Exception as e:
    print("Unexpected error:", sys.exc_info()[0])
    print("Reason:", e)

  return data_dict






def __search__(id):
  "各种has_key和取值"

