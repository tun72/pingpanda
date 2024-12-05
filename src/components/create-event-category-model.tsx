"use client"
import { PropsWithChildren, useState } from "react"
import { Modal } from "./modal"
import { z } from "zod"
import {
  CATEGORY_COLOR_VALIDATOR,
  CATEGORY_EMOJI_VALIDATOR,
  CATEGORY_NAME_VALIDATOR,
} from "@/lib/vendors/category-validator"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"

function CreateEventCategoryModel({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const { mutate: createEventCategory, isPending: isCreating } = useMutation({
    mutationFn: async (data: EventCategoryForm) => {
      await client.category.createEventCategory.$post(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
      setIsOpen(false)
    },
  })
  const EVENT_CATEGORY_VALIDATOR = z.object({
    name: CATEGORY_NAME_VALIDATOR,
    color: CATEGORY_COLOR_VALIDATOR,
    emoji: CATEGORY_EMOJI_VALIDATOR,
  })

  type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

  const COLOR_OPTIONS = [
    { bg: "#FF6B6B", ring: "#FF6B6B" },
    { bg: "#4ECDC4", ring: "#4ECDC4" },
    { bg: "#45B7D1", ring: "#45B7D1" },
    { bg: "#FFA07A", ring: "#FFA07A" },
    { bg: "#98D8C8", ring: "#98D8C8" },
    { bg: "#FDCB6E", ring: "#FDCB6E" },
    { bg: "#6C5CE7", ring: "#6C5CE7" },
    { bg: "#FF85A2", ring: "#FF85A2" },
    { bg: "#2ECC71", ring: "#2ECC71" },
    { bg: "#E17055", ring: "#E17055" },
  ]

  const EMOJI_OPTION = [
    { emoji: "💰", label: "Money (Sale)" },
    { emoji: "👤", label: "User (Sign-up)" },
    { emoji: "🎉", label: "Celebration" },
    { emoji: "📅", label: "Calendar" },
    { emoji: "🚀", label: "Launch" },
    { emoji: "📢", label: "Announcement" },
    { emoji: "🎓", label: "Graduation" },
    { emoji: "🏆", label: "Achievement" },
    { emoji: "💡", label: "Idea" },
    { emoji: "🔔", label: "Notification" },
  ]
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  })

  const color = watch("color")
  const emoji = watch("emoji")

  const onSubmit = (data: EventCategoryForm) => {
    createEventCategory(data)
  }
  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Modal
        setShowModal={setIsOpen}
        showModal={isOpen}
        className="max-w-xl p-8"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className=" tracking-tight text-lg/7 font-medium text-gray-950">
              New Event Category
            </h2>
            <p className=" text-lg/6 text-gray-600">
              Create a new category to organize your events.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                autoFocus
                id="name"
                {...register("name")}
                placeholder="e.g. user-signup"
                className="w-full mt-2"
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="color">Color</Label>
              <div className=" flex flex-wrap gap-3 mt-2">
                {COLOR_OPTIONS.map((premadeColor) => (
                  <button
                    key={premadeColor.bg}
                    style={{ backgroundColor: `${premadeColor.bg}` }}
                    type="button"
                    className={cn(
                      `bg-[${premadeColor.bg}]`,
                      "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                      color === premadeColor.bg
                        ? `ring-[${premadeColor.ring}] scale-110`
                        : "ring-transparent hover:scale-105"
                    )}
                    onClick={() => setValue("color", premadeColor.bg)}
                  ></button>
                ))}
              </div>

              {errors.color ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.color.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="emoji">Emoji</Label>
              <div className=" flex flex-wrap gap-3 mt-2">
                {EMOJI_OPTION.map((premadeEmoji) => (
                  <button
                    key={premadeEmoji.label}
                    type="button"
                    
                    className={cn(
                      "size-10  transition-all text-xl rounded-md flex items-center justify-center",
                      emoji === premadeEmoji.emoji
                        ? "ring-brand-700  bg-brand-100 ring-2 scale-110"
                        : "bg-brand-100 hover:bg-brand-200 hover:shadow-md"
                    )}
                    onClick={() => setValue("emoji", premadeEmoji.emoji)}
                  >
                    {premadeEmoji.emoji}
                  </button>
                ))}
              </div>

              {errors.emoji ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.emoji.message}
                </p>
              ) : null}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant={"outline"} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>

              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default CreateEventCategoryModel
