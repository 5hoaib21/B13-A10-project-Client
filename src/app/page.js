export const dynamic = "force-dynamic";
import Banner from "@/components/Banner";
import FeaturedPrompt from "@/components/FeaturedPrompt";
import FeatureSection from "@/components/FeatureSection";
import ReviewSection from "@/components/ReviewSection";
import TopCreators from "@/components/TopCreators";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getAllPrompts } from "@/lib/api/prompts";


const Home = async () => {
  const prompts = await getAllPrompts();
  const firstPromptId = prompts[0]?._id || null;
  
  return (
    <div>
      <Banner />
      <FeaturedPrompt />
      <WhyChooseUs />
      {firstPromptId && <ReviewSection promptId={firstPromptId} />}
      <TopCreators />
      <FeatureSection /> 
    </div>
  );
};

export default Home;