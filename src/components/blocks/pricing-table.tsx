"use client";

import { useState } from "react";

import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FeatureSection {
  category: string;
  features: {
    name: string;
    starter: true | false | null | string;
    growth: true | false | null | string;
    custom: true | false | null | string;
  }[];
}

const pricingPlans = [
  {
    name: "Starter",
    button: {
      text: "Mulai Sekarang",
      variant: "outline" as const,
    },
  },
  {
    name: "Growth",
    button: {
      text: "Pilih Growth",
      variant: "outline" as const,
    },
  },
  {
    name: "Custom",
    button: {
      text: "Hubungi Kami",
      variant: "outline" as const,
    },
  },
];

const comparisonFeatures: FeatureSection[] = [
  {
    category: "Chatbot & AI",
    features: [
      {
        name: "WhatsApp AI Chatbot",
        starter: true,
        growth: true,
        custom: true,
      },
      {
        name: "Custom conversation flows",
        starter: "Basic",
        growth: "Advanced",
        custom: "Unlimited",
      },
      {
        name: "AI-powered responses",
        starter: true,
        growth: true,
        custom: true,
      },
      {
        name: "Custom AI Agents",
        starter: null,
        growth: null,
        custom: true,
      },
    ],
  },
  {
    category: "Automation & Integration",
    features: [
      {
        name: "Workflow automations",
        starter: "1",
        growth: "3",
        custom: "Unlimited",
      },
      {
        name: "Odoo / CRM integration",
        starter: null,
        growth: true,
        custom: true,
      },
      {
        name: "n8n workflows",
        starter: null,
        growth: true,
        custom: true,
      },
      {
        name: "Lead generation & enrichment",
        starter: null,
        growth: true,
        custom: true,
      },
      {
        name: "Custom API integrations",
        starter: null,
        growth: null,
        custom: true,
      },
    ],
  },
  {
    category: "Support & Delivery",
    features: [
      {
        name: "Setup & deployment",
        starter: true,
        growth: true,
        custom: true,
      },
      {
        name: "Post-launch support",
        starter: "7 hari",
        growth: "30 hari",
        custom: "Dedicated",
      },
      {
        name: "Training tim",
        starter: null,
        growth: true,
        custom: true,
      },
      {
        name: "Dashboard reporting",
        starter: null,
        growth: true,
        custom: true,
      },
      {
        name: "SLA & priority response",
        starter: null,
        growth: null,
        custom: true,
      },
    ],
  },
];

const renderFeatureValue = (value: true | false | null | string) => {
  if (value === true) {
    return <Check className="size-5" />;
  }
  if (value === false) {
    return <X className="size-5" />;
  }
  if (value === null) {
    return null;
  }
  // String value
  return (
    <div className="flex items-center gap-2">
      <Check className="size-4" />
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
};

export const PricingTable = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Growth plan

  return (
    <section className="pb-28 lg:py-32">
      <div className="container">
        <PlanHeaders
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
        />
        <FeatureSections selectedPlan={selectedPlan} />
      </div>
    </section>
  );
};

const PlanHeaders = ({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: number;
  onPlanChange: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Mobile View */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
          <div className="flex items-center justify-between border-b py-4">
            <CollapsibleTrigger className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">
                {pricingPlans[selectedPlan].name}
              </h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <Button
              variant={pricingPlans[selectedPlan].button.variant}
              className="w-fit"
              asChild
            >
              <a href="/contact">
                {pricingPlans[selectedPlan].button.text}
              </a>
            </Button>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan, index) =>
                index !== selectedPlan && (
                  <Button
                    size="lg"
                    variant="secondary"
                    key={index}
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </Button>
                ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop View */}
      <div className="grid grid-cols-4 gap-4 max-md:hidden">
        <div className="col-span-1 max-md:hidden"></div>

        {pricingPlans.map((plan, index) => (
          <div key={index} className="">
            <h3 className="mb-3 text-2xl font-semibold">{plan.name}</h3>
            <Button variant={plan.button.variant} className="" asChild>
              <a href="/contact">{plan.button.text}</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureSections = ({ selectedPlan }: { selectedPlan: number }) => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div key={sectionIndex} className="">
        <div className="border-primary/40 border-b py-4">
          <h3 className="text-lg font-semibold">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="text-foreground grid grid-cols-2 font-medium max-md:border-b md:grid-cols-4"
          >
            <span className="inline-flex items-center py-4">
              {feature.name}
            </span>
            {/* Mobile View - Only Selected Plan */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 py-4 md:border-b">
                {renderFeatureValue(
                  [feature.starter, feature.growth, feature.custom][
                    selectedPlan
                  ],
                )}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-3 md:grid md:grid-cols-3 md:gap-4">
              {[feature.starter, feature.growth, feature.custom].map(
                (value, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 border-b py-4"
                  >
                    {renderFeatureValue(value)}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);
