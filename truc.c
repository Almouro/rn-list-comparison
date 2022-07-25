#include <stdio.h>
#include <stdlib.h>  // for strtol
#include <time.h>

int fibbonacci(int n) {
  if(n == 0){
    return 0;
  } else if(n == 1) {
    return 1;
  } else {
    return (fibbonacci(n-1) + fibbonacci(n-2));
  }
}

int main(int argc, char *argv[])
{
  long n = strtol(argv[1], NULL, 10);
  int nAsInt = n;

  clock_t start = clock();
  int result = fibbonacci(nAsInt);
  clock_t end = clock();

  int cpu_time_used = ((double) (end - start)) / CLOCKS_PER_SEC * 1000;

  printf("%d ", cpu_time_used); 
  return 0;
}

// $ANDROID_HOME/ndk/23.1.7779620/toolchains/llvm/prebuilt/darwin-x86_64/bin/clang++ -target aarch64-linux-android21 truc.c -o program
// adb push program /data/local/tmp/program
// adb shell /data/local/tmp/program 40