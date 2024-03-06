import "mocha";
import { expect } from "chai";
import {
  ArithmeticableCollection,
  Complex,
  Rational,
  ComplexRationalAdapter,
} from "../src/p7-mod1";

describe("Colecciones Aritméticas", () => {
  describe("Números Complejos", () => {
    it("Debe sumar dos números complejos correctamente", () => {
      const a = new Complex(1, 2);
      const b = new Complex(3, 4);
      const resultado = a.add(b);
      expect(resultado.toString()).to.equal("4+6i");
    });

    it("Debe restar dos números complejos correctamente", () => {
      const a = new Complex(5, 5);
      const b = new Complex(3, 2);
      const resultado = a.subtract(b);
      expect(resultado.toString()).to.equal("2+3i");
    });

    it("Debe multiplicar dos números complejos correctamente", () => {
      const a = new Complex(1, 2);
      const b = new Complex(3, 4);
      const resultado = a.multiply(b);
      expect(resultado.toString()).to.equal("-5+10i");
    });

    it("Debe dividir dos números complejos correctamente", () => {
      const a = new Complex(1, 2);
      const b = new Complex(3, 4);
      const resultado = a.divide(b);
      expect(resultado.toString()).to.equal("0.44+0.08i");
    });

    it("Debe manejar números complejos con parte imaginaria negativa", () => {
      const a = new Complex(1, -2);
      const b = new Complex(3, 4);
      const resultadoSuma = a.add(b).toString();
      expect(resultadoSuma).to.equal("4+2i");
    });

    it("Debe manejar números complejos con parte real negativa", () => {
      const a = new Complex(-1, 2);
      const b = new Complex(3, 4);
      const resultadoSuma = a.add(b).toString();
      expect(resultadoSuma).to.equal("2+6i");
    });

    it("Debe manejar números complejos con parte real y parte imaginaria negativas", () => {
      const a = new Complex(-1, -2);
      const b = new Complex(3, 4);
      const resultadoSuma = a.add(b).toString();
      expect(resultadoSuma).to.equal("2+2i");
    });

    it("Debe manejar correctamente el signo en la representación en cadena", () => {
      const a = new Complex(-1, -2);
      const b = new Complex(3, 4);
      const resultadoSuma = a.add(b).toString();
      expect(resultadoSuma).to.equal("2+2i");
    });

    describe("Método toString de Números Complejos", () => {
      it("Debe manejar correctamente la representación en cadena con parte imaginaria negativa", () => {
        const c = new Complex(1, -2);
        expect(c.toString()).to.equal("1-2i");
      });

      it("Debe manejar correctamente la representación en cadena con parte real negativa", () => {
        const c = new Complex(-1, 2);
        expect(c.toString()).to.equal("-1+2i");
      });

      it("Debe manejar correctamente la representación en cadena con parte real y parte imaginaria negativas", () => {
        const c = new Complex(-1, -2);
        expect(c.toString()).to.equal("-1-2i");
      });

      it("Debe manejar correctamente la representación en cadena con parte real y parte imaginaria positivas", () => {
        const c = new Complex(1, 2);
        expect(c.toString()).to.equal("1+2i");
      });

      it("Debe manejar correctamente la representación en cadena con parte real positiva y parte imaginaria cero", () => {
        const c = new Complex(1, 0);
        expect(c.toString()).to.equal("1");
      });

      it("Debe manejar correctamente la representación en cadena con parte real cero y parte imaginaria negativa", () => {
        const c = new Complex(0, -2);
        expect(c.toString()).to.equal("-2i");
      });

      it("Debe manejar correctamente la representación en cadena cuando ambas partes son cero", () => {
        const c = new Complex(0, 0);
        expect(c.toString()).to.equal("0");
      });
    });
  });

  describe("Números Racionales", () => {
    it("Debe sumar dos números racionales correctamente", () => {
      const a = new Rational(1, 3);
      const b = new Rational(2, 3);
      const resultado = a.add(b);
      expect(resultado.toString()).to.equal("1");
    });

    it("Debe restar dos números racionales correctamente", () => {
      const a = new Rational(2, 3);
      const b = new Rational(1, 6);
      const resultado = a.subtract(b);
      expect(resultado.toString()).to.equal("1/2");
    });

    it("Debe multiplicar dos números racionales correctamente", () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      const resultado = a.multiply(b);
      expect(resultado.toString()).to.equal("1/3");
    });

    it("Debe dividir dos números racionales correctamente", () => {
      const a = new Rational(1, 2);
      const b = new Rational(3, 4);
      const resultado = a.divide(b);
      expect(resultado.toString()).to.equal("2/3");
    });

    it("Debe simplificar el resultado de la división", () => {
      const a = new Rational(1, 2);
      const b = new Rational(3, 4);
      const resultado = a.divide(b);
      expect(resultado.toString()).to.equal("2/3");
    });

    it("Debe manejar números racionales negativos", () => {
      const a = new Rational(-1, 2);
      const b = new Rational(3, 4);
      const resultado = a.divide(b);
      expect(resultado.toString()).to.equal("-2/3");
    });

    it("Debe manejar números racionales con denominador negativo", () => {
      const a = new Rational(2, -3);
      expect(a.toString()).to.equal("-2/3");
    });

    it("Debe manejar números racionales con numerador y denominador negativos", () => {
      const a = new Rational(-2, -3);
      expect(a.toString()).to.equal("2/3");
    });

    it("Debe manejar números racionales con numerador 0", () => {
      const a = new Rational(0, 2);
      const b = new Rational(3, 4);
      const resultado = a.multiply(b);
      expect(resultado.toString()).to.equal("0");
    });

    it("Debe lanzar un error al intentar dividir por un número racional con denominador 0", () => {
      const a = new Rational(1, 2);
      expect(() => a.divide(new Rational(1, 0))).to.throw(
        "El denominador no puede ser cero.",
      );
    });

    it("Debe manejar números racionales con numerador 0 en la división", () => {
      const a = new Rational(1, 2);
      const b = new Rational(0, 4);
      expect(() => a.divide(b)).to.throw(
        "No se puede dividir por un número racional con numerador 0.",
      );
    });
  });

  describe("Colecciones de Arithmeticable", () => {
    it("Debe manejar una colección de números complejos", () => {
      const collection = new ArithmeticableCollection<Complex>();
      collection.addArithmeticable(new Complex(1, 2));
      collection.addArithmeticable(new Complex(3, 4));
      expect(collection.getArithmeticable(0)?.toString()).to.equal("1+2i");
      expect(collection.getArithmeticable(1)?.toString()).to.equal("3+4i");
    });

    it("Debe manejar una colección de números racionales", () => {
      const collection = new ArithmeticableCollection<Rational>();
      collection.addArithmeticable(new Rational(1, 2));
      collection.addArithmeticable(new Rational(3, 4));
      expect(collection.getNumberOfArithmeticables()).to.equal(2);
      expect(collection.getArithmeticable(0)?.toString()).to.equal("1/2");
      expect(collection.getArithmeticable(1)?.toString()).to.equal("3/4");
    });

    it("Debe manejar una colección de números complejos y racionales", () => {
      const collection = new ArithmeticableCollection<Complex | Rational>();
      collection.addArithmeticable(new Complex(1, 2));
      collection.addArithmeticable(new Rational(3, 4));
      expect(collection.getNumberOfArithmeticables()).to.equal(2);
      expect(collection.getArithmeticable(0)?.toString()).to.equal("1+2i");
      expect(collection.getArithmeticable(1)?.toString()).to.equal("3/4");
    });

    it("Debe retornar undefined si el índice está fuera del límite", () => {
      const collection = new ArithmeticableCollection<Complex | Rational>();
      collection.addArithmeticable(new Complex(1, 2));
      collection.addArithmeticable(new Rational(3, 4));
      expect(collection.getArithmeticable(2)).to.equal(undefined);
    });
  });
});

describe("Operaciones aritméticas entre complejos y racionales", () => {
  it("Suma de un número complejo y un número racional", () => {
    const complex = new Complex(1, 2);
    const rational = new Rational(3, 4);
    const adapter = new ComplexRationalAdapter(rational, 0);
    const resultado = complex.add(
      new Complex(adapter.getRational().getNumerator(), adapter.getImaginary()),
    );
    expect(resultado.toString()).to.be.equal("4+2i");
  });

  it("Resta de un número complejo y un número racional", () => {
    const complex = new Complex(1, 2);
    const rational = new Rational(3, 4);
    const adapter = new ComplexRationalAdapter(rational, 0);
    const resultado = complex.subtract(
      new Complex(adapter.getRational().getNumerator(), adapter.getImaginary()),
    );
    expect(resultado.toString()).to.be.equal("-2+2i");
  });

  it("Multiplicación de un número complejo y un número racional", () => {
    const complex = new Complex(1, 2);
    const rational = new Rational(3, 4);
    const adapter = new ComplexRationalAdapter(rational, 0);
    const resultado = complex.multiply(
      new Complex(adapter.getRational().getNumerator(), adapter.getImaginary()),
    );
    expect(resultado.toString()).to.be.equal("3+6i");
  });

  it("División de un número complejo y un número racional", () => {
    const complex = new Complex(2, 4);
    const rational = new Rational(1, 4);
    const adapter = new ComplexRationalAdapter(rational, 0);
    const resultado = complex.divide(
      new Complex(adapter.getRational().getNumerator(), adapter.getImaginary()),
    );
    expect(resultado.toString()).to.be.equal("2+4i");
  });

  it("El numerador de la división entre un complejo y un racional no puede ser 0", () => {
    const rational = new Rational(0, 1);
    const complexRationalAdapter = new ComplexRationalAdapter(rational, 0);
    expect(() => {
      complexRationalAdapter.divide(complexRationalAdapter);
    }).to.throw("No se puede dividir por un número racional con numerador 0.");
  });
});
