import Banner from "@/components/Banner";
import ReviewSection from "@/components/ReviewSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getAllPrompts } from "@/lib/api/prompts";


const Home = async () => {
  const prompts = await getAllPrompts();
  const firstPromptId = prompts[0]?._id || null;
  
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      {firstPromptId && <ReviewSection promptId={firstPromptId} />}
    </div>
  );
};

export default Home;