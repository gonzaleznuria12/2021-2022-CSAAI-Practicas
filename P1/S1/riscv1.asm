#-- Programa para asignar el valor 3 al registro
      
        .text
       
       #-- Hacer calculo (x3 = 3)
       #-- addi rd, rs, valor
       #-- rd = rs + valor
       #-- x3 = x0 +  3 ---> x3 = 3
       addi x3, x0, 3
       
       #-- Termina
       li a7,10
       ecall
       
       