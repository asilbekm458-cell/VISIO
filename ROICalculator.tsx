"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, TrendingDown, DollarSign, Clock, BarChart3, Sparkles } from "lucide-react";

export default function ROICalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [rendersPerMonth, setRendersPerMonth] = useState(20);
  const [costPerTraditional, setCostPerTraditional] = useState(400);
  const [timePerTraditional, setTimePerTraditional] = useState(14);

  const calculations = useMemo(() => {
    const monthlyTraditionalCost = rendersPerMonth * costPerTraditional;
    const monthlyTraditionalHours = rendersPerMonth * timePerTraditional * 8;

    // VISIO pricing (Early Bird): $49, $149, $599
    let visioPlanCost: number;
    let planName: string;

    if (rendersPerMonth <= 5) {
      visioPlanCost = 49;
      planName = "Starter";
    } else if (rendersPerMonth <= 30) {
      visioPlanCost = 149;
      planName = "Pro (Early Bird)";
    } else {
      visioPlanCost = 599;
      planName = "Enterprise (Early Bird)";
    }

    const monthlyVisioCost = visioPlanCost;
    const monthlyVisioHours = rendersPerMonth * 3;
    const hoursSaved = monthlyTraditionalHours - monthlyVisioHours;
    const monthlyCostSavings = monthlyTraditionalCost - monthlyVisioCost;
    const yearlyCostSavings = monthlyCostSavings * 12;
    const yearlyTimeSavings = hoursSaved * 12;
    const roi = monthlyVisioCost > 0 ? ((monthlyCostSavings / monthlyVisioCost) * 100).toFixed(0) : "0";

    return {
      monthlyTraditionalCost,
      monthlyVisioCost,
      monthlyCostSavings,
      yearlyCostSavings,
      hoursSaved,
      yearlyTimeSavings,
      roi,
      visioPlanCost,
      planName,
    };
  }, [rendersPerMonth, costPerTraditional, timePerTraditional]);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat("en-US").format(Math.round(n));

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#00D68F] font-medium mb-2">
            ROI Kalkulyator &middot; Aniq hisob-kitob
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            VISIO qancha pul tejaydi?
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            Parametrlaringizni kiriting — aniq raqamlarni ko&apos;ring.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 sm:p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-[#5B5FEF]" />
                <h3 className="text-[14px] font-semibold text-[#EEF2FF]">Parametrlar</h3>
              </div>

              {/* Renders per month */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] text-[#94A3C4]">Render soni / oy</label>
                  <span className="text-[14px] font-bold text-[#5B5FEF] tabular-nums">{rendersPerMonth}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={rendersPerMonth}
                  onChange={(e) => setRendersPerMonth(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#111E30] rounded-full appearance-none cursor-pointer accent-[#5B5FEF] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5B5FEF] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#5B5FEF]/30 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <div className="flex justify-between text-[10px] text-[#4A5A7A] mt-1">
                  <span>1</span><span>50</span><span>100</span>
                </div>
              </div>

              {/* Cost per render */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] text-[#94A3C4]">An&apos;anaviy render narxi ($)</label>
                  <span className="text-[14px] font-bold text-[#F0A500] tabular-nums">${costPerTraditional}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={costPerTraditional}
                  onChange={(e) => setCostPerTraditional(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#111E30] rounded-full appearance-none cursor-pointer accent-[#F0A500] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F0A500] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#F0A500]/30 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <div className="flex justify-between text-[10px] text-[#4A5A7A] mt-1">
                  <span>$100</span><span>$500</span><span>$1,000</span>
                </div>
              </div>

              {/* Time per render */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] text-[#94A3C4]">An&apos;anaviy render vaqti (kun)</label>
                  <span className="text-[14px] font-bold text-[#FF6B6B] tabular-nums">{timePerTraditional} kun</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={30}
                  value={timePerTraditional}
                  onChange={(e) => setTimePerTraditional(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#111E30] rounded-full appearance-none cursor-pointer accent-[#FF6B6B] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF6B6B] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#FF6B6B]/30 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <div className="flex justify-between text-[10px] text-[#4A5A7A] mt-1">
                  <span>3 kun</span><span>15 kun</span><span>30 kun</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-[#00D68F]" />
                <h3 className="text-[14px] font-semibold text-[#EEF2FF]">Natijalar</h3>
              </div>

              {/* Recommended plan */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(91,95,239,0.06)] border border-[rgba(91,95,239,0.15)] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#5B5FEF]" />
                <span className="text-[11px] text-[#A5B4FC] font-medium">
                  Tavsiya etilgan: <span className="text-[#EEF2FF]">{calculations.planName}</span> paketi
                </span>
              </div>

              {/* Big savings */}
              <div className="bg-[rgba(0,214,143,0.06)] border border-[rgba(0,214,143,0.15)] rounded-xl p-5 mb-4">
                <p className="text-[11px] text-[#00D68F] uppercase tracking-[0.5px] font-medium mb-1">Yillik tejash</p>
                <div className="font-serif text-[2.5rem] font-bold text-[#00D68F] leading-none tabular-nums">
                  ${formatNumber(calculations.yearlyCostSavings)}
                </div>
                <p className="text-[12px] text-[#94A3C4] mt-1">
                  ROI: <span className="text-[#EEF2FF] font-semibold tabular-nums">{calculations.roi}%</span>
                </p>
              </div>

              {/* Detail cards */}
              <div className="space-y-3">
                {[
                  { icon: DollarSign, iconBg: "bg-[rgba(255,107,107,0.1)]", iconColor: "text-[#FF6B6B]", label: "An'anaviy (oylik)", value: `$${formatNumber(calculations.monthlyTraditionalCost)}` },
                  { icon: DollarSign, iconBg: "bg-[rgba(91,95,239,0.1)]", iconColor: "text-[#5B5FEF]", label: "VISIO (oylik)", value: `$${formatNumber(calculations.monthlyVisioCost)}` },
                  { icon: Clock, iconBg: "bg-[rgba(240,165,0,0.1)]", iconColor: "text-[#F0A500]", label: "Vaqt tejash (yillik)", value: `${formatNumber(calculations.yearlyTimeSavings)} soat` },
                  { icon: TrendingDown, iconBg: "bg-[rgba(0,214,143,0.1)]", iconColor: "text-[#00D68F]", label: "Oylik tejash", value: `$${formatNumber(calculations.monthlyCostSavings)}` },
                ].map((card) => (
                  <div key={card.label} className="bg-[#111E30] rounded-xl p-4 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                      <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#4A5A7A] uppercase">{card.label}</p>
                      <p className="text-[14px] font-semibold text-[#EEF2FF] tabular-nums">{card.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
