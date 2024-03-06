/**
 * @module Modificación Práctica 7: PE101.
 * @file p7-mod1.ts
 * @date 06/03/2024
 * @brief Ejercicios de las modificaciones corregidos según las indicaciones del profesor.
 * @description Este archivo contiene la implementación de las clases `Arithmeticable`, `ArithmeticableCollection`, `Complex`, `Rational` y `ComplexRationalAdapter`. Este fue el enunciado de la modificación:
 *
 * 1. Suponga que parte de las clases `Rational` y `Complex` de prácticas anteriores, las cuales permiten operar (suma, resta, división y multiplicación) con números racionales y complejos, respectivamente. Escriba un adaptador de racionales que le permita llevar a cabo operaciones aritméticas entre complejos y racionales.
 *
 */

/**
 * Interfaz genérica `Arithmeticable` que define operaciones aritméticas básicas.
 * Define los métodos para sumar, restar, multiplicar y dividir.
 * @template T Tipo genérico para las operaciones aritméticas.
 * @method add Suma de dos elementos.
 * @method subtract Resta de dos elementos.
 * @method multiply Multiplicación de dos elementos.
 * @method divide División de dos elementos.
 * @returns El resultado de la operación aritmética.
 */
export interface Arithmeticable<T> {
  /**
   * Realiza la suma de dos elementos.
   * @param other Elemento a sumar.
   * @returns La suma de this y other.
   */
  add(other: T): T;

  /**
   * Realiza la resta de dos elementos.
   * @param other Elemento a restar.
   * @returns La resta de this y other.
   */
  subtract(other: T): T;

  /**
   * Realiza la multiplicación de dos elementos.
   * @param other Elemento a multiplicar.
   * @returns La multiplicación de this y other.
   */
  multiply(other: T): T;

  /**
   * Realiza la división de dos elementos.
   * @param other Elemento a dividir.
   * @returns La división de this y other.
   */
  divide(other: T): T;
}

/**
 * Clase `ArithmeticableCollection` que gestiona una colección de elementos `Arithmeticable`.
 * Esta clase permite añadir elementos a la colección, obtener un elemento por su índice y obtener el número de elementos.
 * Exige que los elementos implementen la interfaz `Arithmeticable`.
 * @template T Tipo genérico restringido a elementos que implementan `Arithmeticable`.
 * @method addArithmeticable Añade un elemento a la colección.
 * @method getArithmeticable Obtiene un elemento de la colección por su índice.
 * @method getNumberOfArithmeticables Obtiene el número de elementos en la colección.
 * @property elements Lista de elementos de la colección.
 * @returns El resultado de la operación aritmética.
 */
export class ArithmeticableCollection<T extends Arithmeticable<T>> {
  /**
   * Constructor de la clase `ArithmeticableCollection`.
   * @param elements Lista de elementos de la colección.
   * @returns Una instancia de `ArithmeticableCollection`.
   */
  constructor(private elements: T[] = []) {}

  /**
   * Añade un elemento a la colección.
   * @param element Elemento a añadir.
   */
  addArithmeticable(element: T): void {
    this.elements.push(element);
  }

  /**
   * Obtiene un elemento de la colección por su índice.
   * @param index Índice del elemento a obtener.
   * @returns El elemento en el índice dado.
   */
  getArithmeticable(index: number): T | undefined {
    if (index < 0 || index >= this.elements.length) {
      return undefined; // Índice está fuera del límite
    }
    return this.elements[index];
  }

  /**
   * Obtiene el número de elementos en la colección.
   * @returns Número de elementos.
   */
  getNumberOfArithmeticables(): number {
    return this.elements.length;
  }
}

/**
 * Clase `Complex` que representa un número complejo y cumple con `Arithmeticable`.
 * Esta clase permite realizar operaciones aritméticas con números complejos.
 * Implementa los métodos para sumar, restar, multiplicar y dividir.
 * Es hijo de `Arithmeticable` y exige que los números complejos implementen la interfaz `Arithmeticable`.
 * @property real Parte real del número complejo.
 * @property imaginary Parte imaginaria del número complejo.
 * @method add Suma de dos números complejos.
 * @method subtract Resta de dos números complejos.
 * @method multiply Multiplicación de dos números complejos.
 * @method divide División de dos números complejos.
 * @method toString Convierte el número complejo a una cadena de texto.
 * @returns El resultado de la operación aritmética.
 */
export class Complex implements Arithmeticable<Complex> {
  /**
   * Constructor de la clase `Complex`.
   * @param real Parte real del número complejo.
   * @param imaginary Parte imaginaria del número complejo.
   * @returns Una instancia de `Complex`.
   */
  constructor(
    /**
     * Parte real del número complejo.
     * @type {number}
     * @private
     * @memberof Complex
     */
    private real: number,
    /**
     * Parte imaginaria del número complejo.
     * @type {number}
     * @private
     * @memberof Complex
     */
    private imaginary: number,
  ) {}

  /**
   * Suma de dos números complejos.
   * @param other Número complejo a sumar.
   * @returns El resultado de la operación aritmética.
   */
  add(other: Complex): Complex {
    return new Complex(
      this.real + other.real,
      this.imaginary + other.imaginary,
    );
  }

  /**
   * Resta de dos números complejos.
   * @param other Número complejo a restar.
   * @returns El resultado de la operación aritmética.
   */
  subtract(other: Complex): Complex {
    return new Complex(
      this.real - other.real,
      this.imaginary - other.imaginary,
    );
  }

  /**
   * Multiplicación de dos números complejos.
   * @param other Número complejo a multiplicar.
   * @returns El resultado de la operación aritmética.
   */
  multiply(other: Complex): Complex {
    return new Complex(
      this.real * other.real - this.imaginary * other.imaginary,
      this.real * other.imaginary + this.imaginary * other.real,
    );
  }

  /**
   * División de dos números complejos.
   * @param other Número complejo a dividir.
   * @returns El resultado de la operación aritmética.
   */
  divide(other: Complex): Complex {
    const denominator = other.real ** 2 + other.imaginary ** 2;
    return new Complex(
      (this.real * other.real + this.imaginary * other.imaginary) / denominator,
      (this.imaginary * other.real - this.real * other.imaginary) / denominator,
    );
  }

  /**
   * Convierte el número complejo a una cadena de texto.
   * También se encarga de manejar los casos especiales.
   * @returns Representación en cadena del número complejo.
   */
  toString(): string {
    // Caso donde ambas partes son cero.
    if (this.real === 0 && this.imaginary === 0) {
      return "0";
    }
    // Caso donde la parte imaginaria es cero.
    if (this.imaginary === 0) {
      return `${this.real}`;
    }
    // Caso donde la parte real es cero y la imaginaria no.
    if (this.real === 0) {
      return `${this.imaginary}i`;
    }
    // Caso donde la parte imaginaria es positiva, se incluye el signo + explícitamente.
    if (this.imaginary > 0) {
      return `${this.real}+${this.imaginary}i`;
    }
    // Por defecto, se maneja la parte imaginaria negativa (el signo - ya está incluido).
    return `${this.real}${this.imaginary}i`;
  }
}

/**
 * Clase `Rational` que representa un número racional y cumple con `Arithmeticable`.
 * Esta clase permite realizar operaciones aritméticas con números racionales.
 * Implementa los métodos para sumar, restar, multiplicar y dividir.
 * Es hijo de `Arithmeticable` y exige que los números racionales implementen la interfaz `Arithmeticable`.
 * @property numerator Numerador del número racional.
 * @property denominator Denominador del número racional.
 * @method add Suma de dos números racionales.
 * @method subtract Resta de dos números racionales.
 * @method multiply Multiplicación de dos números racionales.
 * @method divide División de dos números racionales.
 * @method simplify Simplifica el número racional.
 * @method mcd Calcula el máximo común divisor.
 * @method toString Convierte el número racional a una cadena de texto.
 * @returns El resultado de la operación aritmética.
 */
export class Rational implements Arithmeticable<Rational> {
  /**
   * Constructor de la clase `Rational`.
   * @param numerator Numerador del número racional.
   * @param denominator Denominador del número racional.
   * @throws Error si el denominador es cero.
   * @returns Una instancia de `Rational`.
   */
  constructor(
    /**
     * Numerador del número racional.
     * @type {number}
     * @private
     * @memberof Rational
     */
    private numerator: number,
    /**
     * Denominador del número racional.
     * @type {number}
     * @private
     * @memberof Rational
     */
    private denominator: number,
  ) {
    if (this.denominator === 0) {
      throw new Error("El denominador no puede ser cero.");
    }
    this.simplify();
  }

  /**
   * Obtiene el numerador del número racional.
   * @returns El numerador del número racional.
   */
  getNumerator(): number {
    return this.numerator;
  }

  /**
   * Obtiene el denominador del número racional.
   * @returns El denominador del número racional.
   */
  getDenominator(): number {
    return this.denominator;
  }

  /**
   * Suma de dos números racionales.
   * @param other Número racional a sumar.
   * @returns El resultado de la operación aritmética.
   */
  add(other: Rational): Rational {
    return new Rational(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator,
    );
  }

  /**
   * Resta de dos números racionales.
   * @param other Número racional a restar.
   * @returns El resultado de la operación aritmética.
   */
  subtract(other: Rational): Rational {
    return new Rational(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator,
    );
  }

  /**
   * Multiplicación de dos números racionales.
   * @param other Número racional a multiplicar.
   * @returns El resultado de la operación aritmética.
   */
  multiply(other: Rational): Rational {
    return new Rational(
      this.numerator * other.numerator,
      this.denominator * other.denominator,
    );
  }

  /**
   * División de dos números racionales.
   * @param other Número racional a dividir.
   * @throws Error si el denominador del número racional `other` es cero.
   * @returns El resultado de la operación aritmética.
   */
  divide(other: Rational): Rational {
    if (other.numerator === 0) {
      throw new Error(
        "No se puede dividir por un número racional con numerador 0.",
      );
    }
    return new Rational(
      this.numerator * other.denominator,
      this.denominator * other.numerator,
    );
  }

  /**
   * Simplifica el número racional.
   * @returns El número racional simplificado.
   */
  private simplify(): void {
    const mcd = this.mcd(this.numerator, this.denominator);
    this.numerator /= mcd;
    this.denominator /= mcd;
  }

  /**
   * Calcula el máximo común divisor.
   * @param a Primer número entero.
   * @param b Segundo número entero.
   * @returns El máximo común divisor de a y b.
   */
  private mcd(a: number, b: number): number {
    return b ? this.mcd(b, a % b) : a;
  }

  /**
   * Convierte el número racional a una cadena de texto.
   * @returns Representación en cadena del número racional.
   */
  toString(): string {
    if (this.denominator === 1) {
      return `${this.numerator}`;
    }
    return `${this.numerator}/${this.denominator}`;
  }
}

/**
 * Clase `ComplexRationalAdapter` que actúa como adaptador entre números complejos y racionales.
 * Permite operaciones aritméticas entre números complejos y racionales.
 * Implementa los métodos para sumar, restar, multiplicar y dividir.
 * Es hijo de `Arithmeticable` y exige que los números complejos implementen la interfaz `Arithmeticable`.
 * @property rational Número racional utilizado en el adaptador.
 * @method add Suma de un número complejo y un número racional.
 * @method subtract Resta de un número complejo y un número racional.
 * @method multiply Multiplicación de un número complejo y un número racional.
 * @method divide División de un número complejo y un número racional.
 * @returns El resultado de la operación aritmética.
 */
export class ComplexRationalAdapter
  implements Arithmeticable<ComplexRationalAdapter>
{
  /**
   * Constructor de la clase `ComplexRationalAdapter`.
   * @param rational Número racional a adaptar.
   * @param imaginary Parte imaginaria del número complejo.
   * @returns Una instancia de `ComplexRationalAdapter`.
   */
  constructor(
    private rational: Rational,
    private imaginary: number,
  ) {}

  getRational(): Rational {
    return this.rational;
  }

  getImaginary(): number {
    return this.imaginary;
  }

  /**
   * Suma de un número complejo y un número racional.
   * @param other Número complejo a sumar.
   * @returns El resultado de la operación aritmética.
   */
  add(other: ComplexRationalAdapter): ComplexRationalAdapter {
    return new ComplexRationalAdapter(
      this.rational.add(other.rational),
      this.imaginary + other.imaginary,
    );
  }

  /**
   * Resta de un número complejo y un número racional.
   * @param other Número complejo a restar.
   * @returns El resultado de la operación aritmética.
   */
  subtract(other: ComplexRationalAdapter): ComplexRationalAdapter {
    return new ComplexRationalAdapter(
      this.rational.subtract(other.rational),
      this.imaginary - other.imaginary,
    );
  }

  /**
   * Multiplicación de un número complejo y un número racional.
   * @param other Número complejo a multiplicar.
   * @returns El resultado de la operación aritmética.
   */
  multiply(other: ComplexRationalAdapter): ComplexRationalAdapter {
    return new ComplexRationalAdapter(
      this.rational.multiply(other.rational),
      this.imaginary * other.imaginary,
    );
  }

  /**
   * División de un número complejo y un número racional.
   * @param other Número complejo a dividir.
   * @throws Error si el número racional `other` tiene un numerador igual a cero.
   * @returns El resultado de la operación aritmética.
   */
  divide(other: ComplexRationalAdapter): ComplexRationalAdapter {
    if (other.rational.getNumerator() === 0) {
      throw new Error(
        "No se puede dividir por un número racional con numerador 0.",
      );
    }
    return new ComplexRationalAdapter(
      this.rational.divide(other.rational),
      this.imaginary / other.imaginary,
    );
  }
}
