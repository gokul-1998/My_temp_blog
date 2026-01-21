Running a C program in Ubuntu involves writing the code, compiling it, and then executing the compiled program. This process typically uses the GNU Compiler Collection (GCC).

1. Install GCC (if not already installed):
GCC is usually included in the build-essential package. Open a terminal (Ctrl+Alt+T) and run:
sudo apt update
sudo apt install build-essential

You can verify the installation by checking the GCC version:
gcc --version

1. Write Your C Program:
Create a new file with a .c extension (e.g., hello.c) using a text editor like nano, gedit, or vim.
# include <stdio.h>

int main() {
    printf("Hello, Ubuntu!\n");
    return 0;
}

Save the file.
3. Compile the C Program:
Navigate to the directory where you saved your C file in the terminal using the cd command. Then, compile the program using GCC:
gcc hello.c -o hello_program

• gcc: Invokes the C compiler.
• hello.c: Your C source code file.
• -o hello_program: Specifies the name of the executable output file (you can choose any name). If you omit -o, the default executable name will be a.out.

1. Run the Compiled Program:
Execute the compiled program from the terminal:
./hello_program

This will run your C program, and you will see the output in the terminal. If you used the default a.out name, you would run it as ./a.out.

AI responses may include mistakes.
