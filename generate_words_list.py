input_path = "corncob_caps.txt"
output_path = "src/utils/wordsList.js"

with open(input_path,'r') as input_file, open(output_path,'w') as output_file:
    output_file.write("const wordsList = [\n")
    for word in input_file.read().splitlines():
        output_file.write(f"\t\"{word}\",\n")
    output_file.write("];\n\nexport default wordsList;")