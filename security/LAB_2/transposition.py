def encrypt(text, tableSize, xkey, ykey):
    return ''.join(text[tableSize*(y-1)+(x-1)] for y in ykey for x in xkey)

def decrypt(text, tableSize, xkey, ykey):
    return ''.join(text[tableSize*(y-1)+(x-1)] for y in ykey for x in xkey)