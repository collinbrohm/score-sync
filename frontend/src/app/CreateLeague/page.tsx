"use client";
import React, { useState } from "react";
import { LeagueFormData, Team, SportType } from "../types/league";
import LeagueBasicInfo from "../components/LeagueBasicInfo";
import BasketballSettings from "../components/BasketballSettings";
import TeamsSection from "../components/TeamsSection";
import SchedulePreferences from "../components/SchedulePreferences";
import AdministratorInfo from "../components/AdministratorInfo";
import LeagueRules from "../components/LeagueRules";
import Button from "../components/ui/Button";
import ProgressSteps from "../components/ui/ProgressSteps";
import { ShoppingBasket as Basketball } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateLeagueProps {
  onSuccess: () => void;
}

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

const CreateLeague: React.FC<CreateLeagueProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<LeagueFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [leagueName, setLeagueName] = useState('');
  const [location, setLocation] = useState('');
  const [season, setSeason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quarterLength, setQuarterLength] = useState('');
  const [shotClock, setShotClock] = useState('');
  const [otLength, setOtLength] = useState('');
  const [foulsPerQt, setFoulsPerQt] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhoneNum, setAdminPhoneNum] = useState('');
  const [leagueRules, setLeagueRules] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const league_payload = {
    league_name: formData.leagueSettings.name,
    location: formData.leagueSettings.location,
    season: formData.leagueSettings.season,
    start_date: formData.leagueSettings.startDate,
    end_date: formData.leagueSettings.endDate,
    quarter_length: formData.basketballSettings.quarterLength,
    shot_clock: formData.basketballSettings.shotClockLength,
    ot_length: formData.basketballSettings.overtimeLength,
    fouls_per_qt: formData.basketballSettings.foulsPerQuarter,
    admin_name: formData.administrator.name,
    admin_email: formData.administrator.email,
    admin_phone_num: formData.administrator.phone,
    league_rules: formData.rules,
  };

  try {
    const response = await fetch('http://localhost:5000/league', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(league_payload)
    });

    if (response.ok) {
      const json = await response.json();
      const league_id = json.id; 
      localStorage.setItem("league_id", league_id.toString());
      
      const team_payload = formData.teams.map((team) => ({
        team_name: team.name,
        contact_person: team.contactName,
        contact_email: team.contactEmail,
        league_id: league_id 
      }));

      const teamRes = await fetch('http://localhost:5000/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teams: team_payload })
      });
      console.log("Team response:", teamRes.status);
      if (teamRes.ok) {
  
        router.push("/Dashboard");
      } else {
        alert("League created but failed to add teams.");
      }
    } else {
      alert("Failed to create league.");
    }
  } catch (error) {
    console.error("Error submitting league:", error);
    alert("An error occurred.");
  } finally {
    setIsSubmitting(false);
  }
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
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}

          <div className="ml-auto">
            {isLastStep ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating League..." : "Create League"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={isSubmitting}
              >
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
