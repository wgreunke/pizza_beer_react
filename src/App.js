import React, { useState } from 'react';

const PizzaBeerCalculator = () => {
  const [pizzaPreTax, setPizzaPreTax] = useState('');
  const [pizzaNum, setPizzaNum] = useState('');
  const [beerPreTax, setBeerPreTax] = useState('');
  const [beerNum, setBeerNum] = useState('');
  const [tax, setTax] = useState('');
  const [results, setResults] = useState(null);

  const handleIntegerInput = (setValue) => (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setValue(value);
    }
  };

  const calculateBill = () => {
    const pizzaPreTaxNum = parseFloat(pizzaPreTax) || 0;
    const pizzaNumInt = parseInt(pizzaNum) || 0;
    const beerPreTaxNum = parseFloat(beerPreTax) || 0;
    const beerNumInt = parseInt(beerNum) || 0;
    const taxNum = parseFloat(tax) || 0;

    const pizzaRatio = pizzaPreTaxNum / (pizzaPreTaxNum + beerPreTaxNum + 0.001);
    const beerRatio = 1 - pizzaRatio;
    const pizzaTax = pizzaRatio * taxNum;
    const beerTax = beerRatio * taxNum;
    const pizzaPerPerson = (pizzaPreTaxNum + pizzaTax) / (pizzaNumInt || 1);
    const beerPerPerson = (beerPreTaxNum + beerTax) / (beerNumInt || 1);
    const pizzaAndBeerPerPerson = pizzaPerPerson + beerPerPerson;

    const pizzaOnlyPeople = pizzaNumInt - beerNumInt;
    const pizzaOnlyTotal = pizzaPerPerson * pizzaOnlyPeople;
    const pizzaAndBeerTotal = pizzaAndBeerPerPerson * beerNumInt;
    const totalBill = pizzaOnlyTotal + pizzaAndBeerTotal;

    setResults({
      pizzaPerPerson: pizzaPerPerson.toFixed(2),
      beerPerPerson: beerPerPerson.toFixed(2),
      pizzaAndBeerPerPerson: pizzaAndBeerPerPerson.toFixed(2),
      pizzaTax: pizzaTax.toFixed(2),
      beerTax: beerTax.toFixed(2),
      pizzaOnlyTotal: pizzaOnlyTotal.toFixed(2),
      pizzaAndBeerTotal: pizzaAndBeerTotal.toFixed(2),
      totalBill: totalBill.toFixed(2),
      pizzaOnlyPeople,
      pizzaAndBeerPeople: beerNumInt
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Pizza and Beer Calculator for Fleet 18</h1>
      <p style={{ marginBottom: '20px' }}>
        Fleet 18 is a group of windsurfers who race on Foster City Lagoon on Tuesday Nights. 
        After racing, we go to Waterfront Pizza for pizza and beer. Everyone has pizza but 
        not everyone has beer. This app helps determine how much people owe.
      </p>
      <a href="https://waterfrontpizza.com/" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'block' }}>
        Waterfront Pizza
      </a>

      <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Pizza</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pizzaPreTax">Pizza amount without tax</label>
          <input
            id="pizzaPreTax"
            type="number"
            placeholder="Pizza amount without tax"
            value={pizzaPreTax}
            onChange={(e) => setPizzaPreTax(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '5px', marginTop: '5px' }}
          /> 
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pizzaNum">Number of people who ate pizza</label>
          <input
            id="pizzaNum"
            type="number"
            placeholder="Number of people who ate pizza"
            value={pizzaNum}
            onChange={handleIntegerInput(setPizzaNum)}
            style={{ display: 'block', width: '100%', padding: '5px', marginTop: '5px' }}
          />
        </div>
        <p>Pizza per person - no tax: ${((parseFloat(pizzaPreTax) / (parseInt(pizzaNum) || 1)) || 0).toFixed(2)}</p>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Beer</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="beerPreTax">Beer amount without tax</label>
          <input
            id="beerPreTax"
            type="number"
            placeholder="Beer amount"
            value={beerPreTax}
            onChange={(e) => setBeerPreTax(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '5px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="beerNum">Number of people who had pizza and beer</label>
          <input
            id="beerNum"
            type="number"
            placeholder="Number of people who had pizza and beer"
            value={beerNum}
            onChange={handleIntegerInput(setBeerNum)}
            style={{ display: 'block', width: '100%', padding: '5px', marginTop: '5px' }}
          />
        </div>
        <p>Beer per person - no tax: ${((parseFloat(beerPreTax) / (parseInt(beerNum) || 1)) || 0).toFixed(2)}</p>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Tax</h2>
        <input
          type="number"
          placeholder="Tax amount"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '5px' }}
        />
      </div>

      <button onClick={calculateBill} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>Add it Up!</button>

      {results && (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Final Numbers With Tax</h2>
          <p>Per Person for people having just pizza w/tax: ${results.pizzaPerPerson}</p>
          <p>Per Person for beer w/tax: ${results.beerPerPerson}</p>
          <p>Per Person for people having Pizza and Beer w/tax: ${results.pizzaAndBeerPerPerson}</p>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px' }}>Validate the numbers</h3>
          <p>Pizza Tax: ${results.pizzaTax}</p>
          <p>Beer Tax: ${results.beerTax}</p>
          <p>{results.pizzaOnlyPeople} People had pizza only, paying ${results.pizzaPerPerson} for a total of ${results.pizzaOnlyTotal}.</p>
          <p>{results.pizzaAndBeerPeople} People had pizza and beer, paying ${results.pizzaAndBeerPerPerson} for a total of ${results.pizzaAndBeerTotal}.</p>
          <p style={{ fontWeight: 'bold' }}>Total bill: ${results.totalBill}</p>
        </div>
      )}

      <p style={{ marginTop: '20px' }}>Written by Ward Greunke, React version by Claude</p>
    </div>
  );
};

export default PizzaBeerCalculator;