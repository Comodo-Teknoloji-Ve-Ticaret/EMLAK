import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateMortgage } from '../utils/formatters';

interface MortgageCalculatorProps {
  onOpenConsultation: () => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ onOpenConsultation }) => {
  const [propertyPrice, setPropertyPrice] = useState(25000000); // 25 Million default
  const [downPaymentPercent, setDownPaymentPercent] = useState(25); // 25% down payment
  const [loanTermMonths, setLoanTermMonths] = useState(60); // 5 years
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(2.79); // 2.79%

  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, propertyPrice - downPaymentAmount);

  const { monthlyPayment, totalPayment, totalInterest } = calculateMortgage(
    loanAmount,
    monthlyInterestRate,
    loanTermMonths
  );

  const principalRatio = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;
  const interestRatio = 100 - principalRatio;

  return (
    <section id="mortgage-calculator" className="calculator-section">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge badge-gold">
            <Calculator size={13} />
            <span>Finansman Planlama Aracı</span>
          </div>
          <h2 className="section-title">
            Akıllı Konut Kredisi & <span className="gold-gradient-text">Ödeme Planı</span>
          </h2>
          <p className="section-subtitle">
            Satın almayı planladığınız lüks konut için peşinat, vade ve faiz oranına göre
            aylık taksit tutarınızı ve toplam geri ödeme tablonuzu anında simüle edin.
          </p>
        </div>

        <div className="calculator-card glass-panel">
          <div className="calculator-grid">
            {/* Left Controls Column */}
            <div className="calculator-controls">
              {/* Property Price Input */}
              <div className="calc-group">
                <div className="group-label-row">
                  <label>Konut Satış Fiyatı</label>
                  <span className="group-val-badge">
                    ₺{new Intl.NumberFormat('tr-TR').format(propertyPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={100000000}
                  step={500000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="range-bounds">
                  <span>₺5.000.000</span>
                  <span>₺100.000.000+</span>
                </div>
              </div>

              {/* Down Payment % and Amount */}
              <div className="calc-group">
                <div className="group-label-row">
                  <label>Peşinat Oranı</label>
                  <span className="group-val-badge">
                    %{downPaymentPercent} (₺{new Intl.NumberFormat('tr-TR').format(downPaymentAmount)})
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={80}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="quick-percent-pills">
                  {[15, 20, 30, 40, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      className={`pct-pill ${downPaymentPercent === pct ? 'active' : ''}`}
                      onClick={() => setDownPaymentPercent(pct)}
                    >
                      %{pct}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Term (Months) */}
              <div className="calc-group">
                <div className="group-label-row">
                  <label>Kredi Vadesi</label>
                  <span className="group-val-badge">
                    {loanTermMonths} Ay ({loanTermMonths / 12} Yıl)
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={120}
                  step={12}
                  value={loanTermMonths}
                  onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="quick-percent-pills">
                  {[12, 24, 36, 60, 84, 120].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`pct-pill ${loanTermMonths === m ? 'active' : ''}`}
                      onClick={() => setLoanTermMonths(m)}
                    >
                      {m / 12} Yıl ({m} Ay)
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Interest Rate */}
              <div className="calc-group">
                <div className="group-label-row">
                  <label>Aylık Faiz Oranı</label>
                  <span className="group-val-badge">%{monthlyInterestRate}</span>
                </div>
                <input
                  type="range"
                  min={1.99}
                  max={4.2}
                  step={0.05}
                  value={monthlyInterestRate}
                  onChange={(e) => setMonthlyInterestRate(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="range-bounds">
                  <span>%1.99</span>
                  <span>%4.20</span>
                </div>
              </div>
            </div>

            {/* Right Results Column */}
            <div className="calculator-results">
              <div className="primary-result-box">
                <span className="result-caption">Aylık Tahmini Ödeme Tutarı</span>
                <div className="result-big-amount">
                  ₺{new Intl.NumberFormat('tr-TR').format(monthlyPayment)}
                </div>
                <span className="result-subtext">
                  Toplam {loanTermMonths} ay boyunca sabit taksitli ödeme
                </span>
              </div>

              {/* Progress Breakdown Bar */}
              <div className="breakdown-wrapper">
                <div className="breakdown-labels">
                  <span className="label-principal">
                    Anapara: %{principalRatio} (₺{new Intl.NumberFormat('tr-TR').format(loanAmount)})
                  </span>
                  <span className="label-interest">
                    Toplam Faiz: %{interestRatio} (₺{new Intl.NumberFormat('tr-TR').format(totalInterest)})
                  </span>
                </div>
                <div className="breakdown-bar">
                  <div
                    className="bar-principal"
                    style={{ width: `${principalRatio}%` }}
                    title={`Anapara: %${principalRatio}`}
                  ></div>
                  <div
                    className="bar-interest"
                    style={{ width: `${interestRatio}%` }}
                    title={`Faiz: %${interestRatio}`}
                  ></div>
                </div>
              </div>

              {/* Breakdown Summary Grid */}
              <div className="summary-list">
                <div className="summary-row">
                  <span>Satış Değeri</span>
                  <strong>₺{new Intl.NumberFormat('tr-TR').format(propertyPrice)}</strong>
                </div>
                <div className="summary-row">
                  <span>Peşinat (%{downPaymentPercent})</span>
                  <strong>₺{new Intl.NumberFormat('tr-TR').format(downPaymentAmount)}</strong>
                </div>
                <div className="summary-row">
                  <span>Kullanılacak Kredi Tutarı</span>
                  <strong>₺{new Intl.NumberFormat('tr-TR').format(loanAmount)}</strong>
                </div>
                <div className="summary-row total-row">
                  <span>Toplam Geri Ödeme Tutarı</span>
                  <strong className="gold-text">
                    ₺{new Intl.NumberFormat('tr-TR').format(totalPayment)}
                  </strong>
                </div>
              </div>

              {/* Action Button */}
              <div className="results-cta">
                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={onOpenConsultation}
                >
                  <span>Özel Banka Faiz Oranları İçin Danışın</span>
                  <ArrowRight size={16} />
                </button>
                <div className="calc-disclaimer">
                  <ShieldCheck size={14} className="emerald-icon" />
                  <span>Anlaşmalı özel bankacılık faiz oranları ile kişiselleştirilebilir.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
