<template>
    <section id="solicitar-acceso" class="w-full min-h-screen py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6 mx-auto">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
            
            <!-- Texto principal limitado a 1000px -->
            <div class="space-y-2 max-w-[1000px] mx-auto">
            <h2 class="!text-2xl md:!text-4xl lg:!text-5xl font-bold tracking-tight animate__animated animate__fadeInUp">
                Accede antes que nadie
            </h2>
            <p class="text-gray-300 md:text-xl mt-2">
                Debido a las restricciones de Spotify en modo de desarrollo, solo podemos aceptar hasta 25 personas. 
                Si quieres probar la app y ver tus estadísticas, solicita acceso y te avisaremos cuando haya disponibilidad.
            </p>
            </div>
            
            <div class="relative w-full max-w-[70%] mx-auto flex h-[500px] flex-col overflow-hidden border border-gray-700 rounded-2xl bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#111] shadow-xl">
                <BorderBeam
                    :size="500"
                    :duration="15"
                    :delay="9"
                    :border-width="2"
                    class="z-10"
                />
                <!-- Fondo animado rotado -->
                <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <!-- Envoltura rotada -->
                <div class="absolute -inset-20 scale-110 -rotate-[16deg]">
                    <!-- Marquees dentro del wrapper rotado -->
                    <Marquee pause-on-hover class="[--duration:20s]">
                    <ReviewCard v-for="review in secondRow" :key="review.username" v-bind="review" />
                    </Marquee>
                    <Marquee reverse pause-on-hover class="[--duration:20s]">
                    <ReviewCard v-for="review in secondRow" :key="review.username" v-bind="review" />
                    </Marquee>
                    <Marquee pause-on-hover class="[--duration:22s]">
                    <ReviewCard v-for="review in firstRow" :key="review.username" v-bind="review" />
                    </Marquee>
                    <Marquee reverse pause-on-hover class="[--duration:24s]">
                    <ReviewCard v-for="review in secondRow" :key="review.username" v-bind="review" />
                    </Marquee>
                    <Marquee pause-on-hover class="[--duration:26s]">
                    <ReviewCard v-for="review in firstRow" :key="review.username" v-bind="review" />
                    </Marquee>
                    <Marquee reverse pause-on-hover class="[--duration:26s]">
                    <ReviewCard v-for="review in firstRow" :key="review.username" v-bind="review" />
                    </Marquee>
                </div>
                </div>

                <!-- Gradiente para oscurecer por encima -->
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                <!-- Contenido encima -->
                <div class="relative z-10 flex flex-col items-center justify-center text-white text-center p-10 space-y-6 h-screen">
                    <BlurReveal
                        :delay="0.2"
                        :duration="1"
                        class="p-8"
                    >
                        <h2 class="text-4xl font-semibold">¿A qué esperas?</h2>
                        <p class="text-gray-400 text-md mt-6 text-center">
                            <span class="font-medium text-white">18 de 25 plazas</span> ya ocupadas
                        </p>
                        <Dialog v-model:open="isOpen">
                            <DialogTrigger>
                                <button class="px-6 py-3 font-semibold bg-green-600 hover:bg-green-700 inline-flex items-center gap-2 text-white rounded-lg hover:scale-105 transition-all">
                                    Solicitar acceso
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right-dashed"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12h.5m3 0h1.5m3 0h6" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
                                </button>
                            </DialogTrigger>
                            <DialogContent class="bg-transparent border-white/30 backdrop-blur-lg text-white p-4 sm:p-6 md:p-8 rounded-lg w-[90%]  md:w-[30%] max-w-screen-md mx-auto landing">
                                <DialogHeader>
                                    <DialogTitle>Solicitar acceso</DialogTitle>
                                    <DialogDescription>
                                        Por favor, proporciona el correo electrónico vinculado a tu cuenta de Spotify para autorizar el acceso a la aplicación.
                                    </DialogDescription>
                                </DialogHeader>

                                <form class="space-y-6" @submit="onSubmit">
                                  <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                                    <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input type="email" placeholder="tu@email.com" v-bind="componentField" />
                                      </FormControl>
                                      <FormDescription>
                                        Este correo será usado para enviarte acceso a la app.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  </FormField>
                                  <DialogFooter>
                                  <Button type="submit" class="hover:scale-105 transition-all bg-green-600 hover:bg-green-700">
                                    Submit
                                  </Button>
                                  </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </BlurReveal>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Marquee from '@/components/ui/marquee/Marquee.vue';
import ReviewCard from '@/components/ui/review-card/ReviewCard.vue';
import BlurReveal from '@/components/ui/blur-reveal/BlurReveal.vue';
import BorderBeam from '@/components/ui/border-beam/BorderBeam.vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import RadiantText from '@/components/ui/radiant-text/RadiantText.vue';

const isOpen = ref(false)

const formSchema = toTypedSchema(z.object({
  email: z.string().email("Introduce un correo válido."),
}));

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    // const res = await fetch("https://formspree.io/f/xzzgywed", {
    const res = await fetch("https://formspree.io/f/id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email }),
    });

    if (!res.ok) throw new Error("Error al enviar el formulario");

    toast({
      title: "Correo enviado con éxito 🎉",
      description: `Hemos recibido tu solicitud de acceso.`,
    });
    isOpen.value = false
  } catch (err) {
    toast({
      title: "Error",
      description: "Hubo un problema al enviar el correo.",
    });
  }
});


const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = ref(reviews.slice(0, reviews.length / 2));
const secondRow = ref(reviews.slice(reviews.length / 2));
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap');

.landing {
  font-family: "Onest", sans-serif;
  font-optical-sizing: auto;
}
</style>