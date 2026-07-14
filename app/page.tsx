import Banner from "@/components/Banner";
import HomeMango from "@/components/HomeMango";
import Moving from "@/components/Moving";
import Review from "@/components/Review";
import WhyChoose from "@/components/WhyChoose";

const page = () => {
  return (
    <>
      <Banner />
      <Moving />
      {/* mangose skip */}
      <HomeMango />
      <WhyChoose />
      <Review />
    </>
  );
};

export default page;
