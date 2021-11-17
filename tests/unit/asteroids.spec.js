import { shallowMount } from "@vue/test-utils";
import Asteroids from "@/components/asteroids/Asteroids.vue";

describe("Asteroids.vue", () => {
  it("renders asteroid and adop data", () => {
    const wrapper = shallowMount(Asteroids);
    expect(wrapper.find(".error").exists()).toBeFalsy();
  });
});
