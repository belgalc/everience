import Section from "./section";

const Admin = () => {
  return (
    <div className="px-32 select-none h-screen bg-gradient-to-r from-white to-slate-200 ">
      <section className="grid grid-cols-4 gap-10 w-full mt-40">
        <Section name="jobs" />
        <Section name="users" />
      </section>
    </div>
  );
};

export default Admin;
