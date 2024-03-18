import { UserAvailability } from "@/models/userAvailability";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; availabilityId: string } }
) {
  try {
    const { id, availabilityId } = params;
    if (!id) {
      NextResponse.json(
        {
          message: "id is required",
        },
        { status: 400 }
      );
    }
    if (!availabilityId) {
      NextResponse.json(
        {
          message: "availability Id is required",
        },
        { status: 400 }
      );
    }
    const availability = await UserAvailability.findOne({
      where: { user_id: id, id: availabilityId },
    });
    if (!availability) {
      NextResponse.json(
        {
          message: "availability not found on this id",
        },
        { status: 400 }
      );
    }
    await UserAvailability.destroy({
        where: { user_id: id, id: availabilityId },
      });
  
      return NextResponse.json({
        message: 'Availability deleted successfully',
        type: "Success",
        code: 200,
      });
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
