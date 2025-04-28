import React, { useState } from "react";
import { LeagueFormData, Team, SportType } from "../app/types/league";
import LeagueBasicInfo from "../app/components/LeagueBasicInfo";
import BasketballSettings from "../app/components/BasketballSettings";
import TeamsSection from "../app/components/TeamsSection";
import SchedulePreferences from "../app/components/SchedulePreferences";
import AdministratorInfo from "../app/components/AdministratorInfo";
import LeagueRules from "../app/components/LeagueRules";
import Button from "../app/components/ui/Button";
import ProgressSteps from "../app/components/ui/ProgressSteps";
import { ShoppingBasket as Basketball } from "lucide-react";

const initialFormData: LeagueFormData = {
  leagueSettings: {
    sport: "basketball" as SportType,
    name: "",
    location: "",
    season: "",
    startDate: "",
    endDate: "",
  },
  basketballSettings: {
    quarterLength: 12,
    shotClockLength: 24,
    overtimeLength: 5,
    foulsPerQuarter: 5,
    useThreePointLine: true,
    useBonus: true,
  },
  teams: [],
  schedulePreference: {
    dayOfWeek: [],
    timeOfDay: [],
    gamesPerWeek: 1,
  },
  administrator: {
    name: "",
    email: "",
    phone: "",
  },
  rules: "",
};

const steps = ["Basic Info", "Game Settings", "Teams", "Schedule", "Finalize"];

const CreateLeague: React.FC = () => {
  const [formData, setFormData] = useState<LeagueFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("League created successfully!");
  };

  const updateLeagueSettings = (settings: typeof formData.leagueSettings) => {
    setFormData({
      ...formData,
      leagueSettings: settings,
    });
  };

  const updateBasketballSettings = (
    settings: typeof formData.basketballSettings
  ) => {
    setFormData({
      ...formData,
      basketballSettings: settings,
    });
  };

  const updateTeams = (teams: Team[]) => {
    setFormData({
      ...formData,
      teams,
    });
  };

  const updateSchedulePreference = (
    preference: typeof formData.schedulePreference
  ) => {
    setFormData({
      ...formData,
      schedulePreference: preference,
    });
  };

  const updateAdministrator = (
    administrator: typeof formData.administrator
  ) => {
    setFormData({
      ...formData,
      administrator,
    });
  };

  const updateRules = (rules: string) => {
    setFormData({
      ...formData,
      rules,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LeagueBasicInfo
            leagueSettings={formData.leagueSettings}
            onChange={updateLeagueSettings}
          />
        );
      case 1:
        return (
          <BasketballSettings
            settings={formData.basketballSettings}
            onChange={updateBasketballSettings}
          />
        );
      case 2:
        return <TeamsSection teams={formData.teams} onChange={updateTeams} />;
      case 3:
        return (
          <SchedulePreferences
            preferences={formData.schedulePreference}
            onChange={updateSchedulePreference}
          />
        );
      case 4:
        return (
          <>
            <AdministratorInfo
              administrator={formData.administrator}
              onChange={updateAdministrator}
            />
            <LeagueRules rules={formData.rules} onChange={updateRules} />
          </>
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center bg-orange-100 p-3 rounded-full mb-4">
          <Basketball size={32} className="text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create a Basketball League
        </h1>
        <p className="text-gray-600">
          Set up your league, add teams, and configure your preferences
        </p>
      </div>

      <ProgressSteps steps={steps} currentStep={currentStep} />

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={handlePrevStep}>
              Back
            </Button>
          )}

          <div className="ml-auto">
            {isLastStep ? (
              <Button type="submit">Create League</Button>
            ) : (
              <Button type="button" onClick={handleNextStep}>
                Continue
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLeague;
